export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      scores: {
        Row: {
          accuracy: number;
          correct_keystrokes: number;
          duration: number;
          incorrect_keystrokes: number;
          missed_words: number;
          raw_wpm: number;
          score_id: number;
          time_stamp: string;
          user_id: string;
          wpm: number;
        };
        Insert: {
          accuracy: number;
          correct_keystrokes: number;
          duration: number;
          incorrect_keystrokes: number;
          missed_words: number;
          raw_wpm: number;
          score_id?: number;
          time_stamp: string;
          user_id: string;
          wpm: number;
        };
        Update: {
          accuracy?: number;
          correct_keystrokes?: number;
          duration?: number;
          incorrect_keystrokes?: number;
          missed_words?: number;
          raw_wpm?: number;
          score_id?: number;
          time_stamp?: string;
          user_id?: string;
          wpm?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'scores_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'scores_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      users: {
        Row: {
          email: string | null;
          id: string | null;
        };
        Insert: {
          email?: string | null;
          id?: string | null;
        };
        Update: {
          email?: string | null;
          id?: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
