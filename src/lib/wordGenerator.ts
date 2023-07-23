import { Language } from '@/types';
import Translate from 'translate';

const wordList = `
the
be
to
of
and
in
that
have
it
for
not
on
with
he
as
you
do
at
this
but
his
by
from
they
we
say
her
she
or
an
will
my
one
all
would
there
their
what
so
up
out
if
about
who
get
which
go
me
when
make
can
like
time
no
just
him
know
take
people
into
year
your
good
some
could
them
see
other
than
then
now
look
only
come
its
over
think
also
back
after
use
two
how
our
work
first
well
way
even
new
want
because
any
these
give
day
most
us
are
has
had
make
did
little
very
on
too
now
came
made
eat
say
are
all
do
be
came
have
out
too
did
can
be
our
well
here
like
with
here
big
day
that
eat
you
one
she
so
us
as
him
up
will
out
at
as
at
of
not
too
us
his
your
me
its
all
from
out
if
on
how
so
into
have
in
very
good
this
came
want
some
too
be
after
about
back
their
how
way
want
these
take
then
into
has
her
she
two
day
little
back
now
too
by
from
its
did
here
some
cake
potato
knife
knee
meow
box
lick
milk
`;

const memoizedTranslations: { [key: string]: string } = {};

export async function createWords(
  wordCount: number,
  wordStyle: Language,
): Promise<string[]> {
  return (await getOrTranslate(wordList, wordStyle))
    .trim()
    .split('\n')
    .sort(() => Math.random() - 0.5)
    .slice(0, wordCount)
    .map((word) => word.trim().toLowerCase());
}

const getOrTranslate = async (wordList: string, wordStyle: Language) => {
  const memoizedTranslatedWordlist = memoizedTranslations?.[wordStyle];
  if (memoizedTranslatedWordlist) {
    return memoizedTranslatedWordlist;
  }

  const translatedWordList = await Translate(wordList, {
    from: 'en',
    to: wordStyle,
  });

  memoizedTranslations[wordStyle] = translatedWordList;

  return translatedWordList;
};
