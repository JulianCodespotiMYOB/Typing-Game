-- Create the scores table
CREATE TABLE public.scores (
  score_id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  wpm INTEGER NOT NULL,
  raw_wpm INTEGER NOT NULL,
  accuracy INTEGER NOT NULL,
  correct_keystrokes INTEGER NOT NULL,
  incorrect_keystrokes INTEGER NOT NULL,
  missed_words INTEGER NOT NULL,
  time TIMESTAMP NOT NULL
);

-- Create an index on user_id for faster queries
CREATE INDEX ON public.scores (user_id);

-- Enable row level security for the users table
ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;