/**
 * Data model for all study content.
 *
 * Everything a student reads is stored as plain data in
 * `src/content/chapters/chapter-NN.ts`. Editing a question never requires
 * touching the UI: components only consume the `Chapter` shape below through
 * the registry in `src/content/index.ts`.
 *
 * Source material: Collett, *Modelling Survival Data in Medical Research*,
 * 4th edition (2023), chapters 1-7. The `source` field on each item points at
 * the book section the item was built from (e.g. "§3.3").
 */

/** A single flashcard: a prompt on the front and the answer on the back. */
export interface Flashcard {
  /** Stable id used as the key for locally stored progress. Never reuse. */
  id: string;
  /** Front of the card (the prompt). */
  front: string;
  /** Back of the card (the answer). */
  back: string;
  /** Optional extra nudge shown before the answer is revealed. */
  hint?: string;
  /** Book section the card was derived from, e.g. "§1.2.1". */
  source: string;
  /** Earlier chapters this card assumes knowledge of (cumulative questions). */
  buildsOn?: number[];
}

/** One multiple-choice question with exactly one correct option. */
export interface MultipleChoiceQuestion {
  /** Stable id used as the key for locally stored progress. Never reuse. */
  id: string;
  /** The question text. */
  prompt: string;
  /**
   * Answer options in authored order. `correctIndex` refers to a position in
   * this array, so reordering the array means updating `correctIndex`.
   */
  options: string[];
  /** Zero-based index into `options` of the single correct answer. */
  correctIndex: number;
  /** Shown after answering to explain why the correct option is correct. */
  explanation: string;
  /** Book section the question was derived from, e.g. "§3.4.1". */
  source: string;
  /** Earlier chapters this question assumes knowledge of. */
  buildsOn?: number[];
}

/** A book chapter with its flashcards and multiple-choice questions. */
export interface Chapter {
  /** Chapter number as used in the book (1-17). */
  number: number;
  /** URL-friendly identifier, e.g. "kaplan-meier". */
  slug: string;
  /** Chapter title without the number. */
  title: string;
  /** One-paragraph description shown on the chapter overview. */
  summary: string;
  /** Book sections covered, e.g. "§1.1-1.4". */
  bookSections: string;
  flashcards: Flashcard[];
  questions: MultipleChoiceQuestion[];
}

/** The two study modes available for every chapter. */
export type StudyMode = 'flashcards' | 'quiz';
