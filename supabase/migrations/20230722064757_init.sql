-- Create the scores table
CREATE TABLE public.scores (
  score_id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  wpm NUMERIC(8, 2) NOT NULL,
  raw_wpm NUMERIC(8, 2) NOT NULL,
  accuracy NUMERIC(8, 2) NOT NULL,
  correct_keystrokes INTEGER NOT NULL,
  incorrect_keystrokes INTEGER NOT NULL,
  missed_words INTEGER NOT NULL,
  time TIMESTAMP NOT NULL
);

-- Create an index on user_id for faster queries
CREATE INDEX ON public.scores (user_id);