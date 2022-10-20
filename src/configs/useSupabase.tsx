import {
  createClient,
  PostgrestError,
  SupabaseClient,
  SupabaseRealtimePayload,
} from "@supabase/supabase-js";
import React, { useCallback } from "react";
import { useToast } from '@chakra-ui/react'
import { createToken, supabaseKey, supabaseUrl } from ".";
import {
  onDeleteNoteSuccess,
  onInsertNoteSuccess,
  onUpdateNoteSuccess,
  setMyNotes,
  setSupabaseClient,
} from "../reduxs/auths/auth.reducers";
import { useAppDispatch, useAppSelector } from "../reduxs/hooks";
import { INoteItem } from "../_types_";
import { getToast } from "../utils";

export default function useSupabase() {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { info, supabaseClient } = useAppSelector((state) => state.auth);

  const onSupabaseListening = useCallback(
    async (payload: SupabaseRealtimePayload<INoteItem>) => {
      const { eventType, new: newNote } = payload;
      switch (eventType) {
        case "INSERT": {
          dispatch(onInsertNoteSuccess(newNote));
          break;
        }
        case "UPDATE": {
          if (newNote.isdeleted) {
            dispatch(onDeleteNoteSuccess(newNote.id));
          } else {
            dispatch(onUpdateNoteSuccess(newNote));
          }
          break;
        }
        case "DELETE": {
          dispatch(onDeleteNoteSuccess(newNote.id));
          break;
        }
        default: {
          break;
        }
      }
    },
    [dispatch]
  );


  const fetchMyNotes = useCallback(
    async (supabase: SupabaseClient) => {
      const { data, error } = await supabase
        .from<INoteItem>("usernotes")
        .select()
        .eq("isdeleted", false)
        .range(0, 49)
        .order("updated_at", { ascending: false });
      if (!error) {
        dispatch(setMyNotes(data));
      }
    },
    [dispatch]
  );

  const onAuthSupabase = useCallback(async () => {
    if (supabaseClient) return;
    if (info?.address) {
      const token = createToken(info.address);
      const supabase = createClient(supabaseUrl!, supabaseKey!);
      supabase.auth.setAuth(token);
      dispatch(setSupabaseClient(supabase));

      supabase
        .from<INoteItem>("usernotes")
        .on("*", (payload) => {
          onSupabaseListening(payload);
        })
        .subscribe();
              
      fetchMyNotes(supabase)
    }
  }, [supabaseClient, info?.address, dispatch, fetchMyNotes, onSupabaseListening]);

  React.useEffect(() => {
    onAuthSupabase();
  }, [onAuthSupabase]);


  const onError = useCallback((error: PostgrestError | null) => {
    if (error) {
      toast(getToast(error.message));
    }
  }, [toast]);

  const onUpdate = useCallback(
    async (title: string, content: string, id: number) => {
      let strContent = content.replaceAll("\\n", "\n");
      if (strContent.charAt(0) === '"')
        strContent = strContent.substring(1);
      if (strContent.charAt(strContent.length -1) === '"')
        strContent = strContent.substring(0, strContent.length -1);

      if (supabaseClient) {
        const { error } = await supabaseClient
          .from("usernotes")
          .update([
            {
              title,
              content: strContent,
              updated_at: new Date(),
            },
          ])
          .eq("id", id);
        onError(error);
      }
    },
    [onError, supabaseClient]
  );

  const onInsert = useCallback(async () => {
    if (supabaseClient) {
      const { error } = await supabaseClient?.from("usernotes").insert([
        {
          wallet_address: info?.address,
          title: "New Note",
          content: "",
        },
      ]);
      onError(error);
    }
  }, [info?.address, onError, supabaseClient]);

  const onDelete = useCallback(
    async (id: number) => {
      if (supabaseClient) {
        const { error, data } = await supabaseClient
          .from("usernotes")
          .update([
            {
              isdeleted: true,
            },
          ])
          .eq("id", id);
        onError(error);
      }
    },
    [onError, supabaseClient]
  );

  return {
    onUpdate,
    onInsert,
    onDelete,
  };
}
