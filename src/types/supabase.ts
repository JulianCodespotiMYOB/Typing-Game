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
          incorrect_keystrokes: number;
          missed_words: number;
          raw_wpm: number;
          score_id: number;
          time: string;
          user_id: string;
          wpm: number;
        };
        Insert: {
          accuracy: number;
          correct_keystrokes: number;
          incorrect_keystrokes: number;
          missed_words: number;
          raw_wpm: number;
          score_id?: number;
          time: string;
          user_id: string;
          wpm: number;
        };
        Update: {
          accuracy?: number;
          correct_keystrokes?: number;
          incorrect_keystrokes?: number;
          missed_words?: number;
          raw_wpm?: number;
          score_id?: number;
          time?: string;
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
        ];
      };
    };
    Views: {
      [_ in never]: never;
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
