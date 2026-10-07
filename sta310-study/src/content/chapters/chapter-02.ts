import type { Chapter } from '../types'

/**
 * Chapter 2 - Some non-parametric procedures (Collett, 4th ed.).
 * Kaplan-Meier and Nelson-Aalen estimation, life tables, percentiles, and the
 * log-rank / Wilcoxon / Peto-Peto family of tests.
 */
export const chapter02: Chapter = {
  number: 2,
  slug: 'non-parametric-procedures',
  title: 'Some non-parametric procedures',
  summary:
    'Estimating S(t), H(t) and percentiles without distributional assumptions (Kaplan-Meier, Nelson-Aalen, life tables) and comparing groups with log-rank, Wilcoxon and Peto-Peto tests.',
  bookSections: '§2.1-2.9',
  flashcards: [
    {
      id: 'ch02-f01',
      front: 'How is the empirical survivor function defined when there is no censoring?',
      back: 'S(t) = (number of individuals with survival times >= t) / (total number in the data set) = 1 - F(t). It equals 1 before the first death time and 0 after the last.',
      source: '§2.1',
    },
    {
      id: 'ch02-f02',
      front: 'State the Kaplan-Meier (product-limit) estimate of S(t).',
      back: 'S(t) = product over event times t_(j) <= t of (n_j - d_j)/n_j, where n_j is the number at risk just before t_(j) and d_j is the number of deaths at t_(j). It is a step function that drops only at observed event times.',
      source: '§2.1.2',
    },
    {
      id: 'ch02-f03',
      front: 'Why does the Kaplan-Meier estimate not drop at a censored time?',
      back: 'No event occurs there, so the factor (n_j - d_j)/n_j is unchanged. Censoring still matters because it removes that individual from later risk sets, which makes later drops larger.',
      source: '§2.1.2',
    },
    {
      id: 'ch02-f04',
      front: 'When would you use the life-table (actuarial) estimate instead of Kaplan-Meier?',
      back: 'When data are grouped and only the numbers of deaths and censored observations per interval are known (interval-censored data). It uses the adjusted number at risk n\'_j = n_j - c_j/2, assuming censoring is uniform within the interval (the actuarial assumption).',
      source: '§2.1.1',
    },
    {
      id: 'ch02-f05',
      front: 'How is the median survival time estimated from a Kaplan-Meier curve?',
      back: 'It is the smallest observed event time t with S(t) < 0.5. If exactly 0.5 on an interval, take the midpoint of that interval. If S(t) never falls below 0.5, the median cannot be estimated.',
      source: '§2.4',
    },
    {
      id: 'ch02-f06',
      front: 'Define the pth percentile and the semi-interquartile range of survival times.',
      back: 't(p) is the smallest time with S{t(p)} < 1 - p/100 (so t(50) is the median). SIQR = {t(75) - t(25)}/2, where t(25) and t(75) are the first and third quartiles; a larger SIQR means more dispersion.',
      source: '§2.4',
    },
    {
      id: 'ch02-f07',
      front: 'State Greenwood\'s formula for the standard error of the Kaplan-Meier estimate.',
      back: 'se{S(t)} = S(t) * sqrt( sum over event times up to t of d_j / [n_j (n_j - d_j)] ). The SE grows with t because the risk set shrinks, so confidence intervals widen at long survival times.',
      source: '§2.2.1',
    },
    {
      id: 'ch02-f08',
      front: 'What is the Nelson-Aalen estimate of the cumulative hazard?',
      back: 'H(t) = sum over event times up to t of d_j/n_j. It accumulates the estimated event probability d_j/n_j at each event time, i.e. the cumulative risk. The corresponding survivor estimate is exp{-H(t)}.',
      source: '§2.3',
    },
    {
      id: 'ch02-f09',
      front: 'How do the Nelson-Aalen and Kaplan-Meier survivor estimates compare?',
      back: 'The survivor function derived from the Nelson-Aalen estimate, exp{-H(t)}, is always at least as large as the Kaplan-Meier estimate, because e^-x >= 1 - x. The two agree closely except in the tail where the risk set is small.',
      source: '§2.1.2',
    },
    {
      id: 'ch02-f10',
      front: 'What null hypothesis does the log-rank test evaluate, and what is its test statistic?',
      back: 'H0: no difference in the survival experience (hazard) of the groups. At each death time it compares observed deaths d_1j with the hypergeometric expectation e_1j = n_1j d_j/n_j; the statistic (O - E)^2/V is chi-squared on 1 df for two groups.',
      source: '§2.6.2',
    },
    {
      id: 'ch02-f11',
      front: 'When is the log-rank test the most powerful non-parametric comparison?',
      back: 'When proportional hazards holds, i.e. the hazard in one group is a constant multiple of the hazard in the other at every time. Then the true survivor functions do not cross. Non-crossing is necessary but not sufficient evidence of proportional hazards.',
      source: '§2.6.5',
    },
    {
      id: 'ch02-f12',
      front: 'How do the Wilcoxon and Peto-Peto tests differ from the log-rank test?',
      back: 'The Wilcoxon test weights each death-time comparison by the risk-set size n_j, so it is more sensitive to early differences. The Peto-Peto test behaves like Wilcoxon but performs better when censoring patterns differ between groups, so it is the preferred alternative when proportional hazards is in doubt.',
      source: '§2.6.4-2.6.5',
    },
    {
      id: 'ch02-f13',
      front: 'What is a stratified log-rank test and what does it add?',
      back: 'It computes the log-rank U- and V-statistics within each stratum and combines them: W_S = (sum of U_k)^2 / (sum of V_k), chi-squared on 1 df. It tests for a treatment difference after allowing for the stratifying variable (e.g. centre, age group), giving a single more precise summary than separate tests.',
      source: '§2.8',
    },
    {
      id: 'ch02-f14',
      front: 'When is the log-rank test for trend appropriate?',
      back: 'When three or more groups are naturally ordered (dose, disease stage, age group). It uses group codes w_k and the statistic U_T = sum w_k (d_k. - e_k.), with variance V_T = sum (w_k - w_bar)^2 e_k., and is more powerful at detecting a monotone trend than the standard log-rank test.',
      source: '§2.9',
    },
  ],
  questions: [
    {
      id: 'ch02-q01',
      prompt:
        'Six patients have times (months) 3, 4+, 5, 5, 7, 10+ where "+" marks censoring. What is the Kaplan-Meier estimate of S(t) at t = 5 months?',
      options: ['0.833', '0.667', '0.417', '0.500'],
      correctIndex: 2,
      explanation:
        'At t = 3, n = 6 and d = 1, giving 5/6 = 0.833. Just before t = 5 one patient has died and one has been censored, so n = 4 and d = 2, giving 0.833 * (4-2)/4 = 0.417.',
      source: '§2.1.2',
    },
    {
      id: 'ch02-q02',
      prompt:
        'Two groups of survival times are compared. Their estimated survivor functions do not cross and proportional hazards seems plausible. Which test is most appropriate, and why?',
      options: [
        'Wilcoxon, because it weights early differences more heavily.',
        'Log-rank, because it is the most powerful test under proportional hazards.',
        'Peto-Peto, because it is always more powerful than the log-rank test.',
        'A stratified log-rank test, because stratification is always required.',
      ],
      correctIndex: 1,
      explanation:
        'Under proportional hazards the log-rank test is the most powerful of the three. Wilcoxon is better for early differences; Peto-Peto is preferred only when the censoring pattern differs between groups.',
      source: '§2.6.5',
    },
    {
      id: 'ch02-q03',
      prompt:
        'Seven patients have times 3, 5, 5, 8+, 10, 12, 15 (months, "+" = censored). What is the Nelson-Aalen estimate of the cumulative hazard at t = 10?',
      options: ['0.476', '0.810', '1.310', '0.381'],
      correctIndex: 1,
      explanation:
        'H(3) = 1/7 = 0.143; H(5) = 0.143 + 2/6 = 0.476; the 8+ patient leaves the risk set, so n = 3 at t = 10 and H(10) = 0.476 + 1/3 = 0.810.',
      source: '§2.3',
    },
    {
      id: 'ch02-q04',
      prompt:
        'The Kaplan-Meier estimate S(t) is greater than 0.5 for every observed time in the study. What can be reported?',
      options: [
        'The median survival time is the largest observed time.',
        'The median survival time is undefined; report other percentiles or survival probabilities at fixed times instead.',
        'The median survival time is 0.5 times the largest observed time.',
        'The data must be re-analysed with a parametric model before anything can be reported.',
      ],
      correctIndex: 1,
      explanation:
        'The median is the smallest time with S(t) < 0.5. If that never happens, the median cannot be estimated; other percentiles or survival probabilities at specified time points are informative alternatives.',
      source: '§2.4',
    },
    {
      id: 'ch02-q05',
      prompt:
        'Why does the standard error of the Kaplan-Meier estimate use Greenwood\'s formula rather than the usual binomial standard error?',
      options: [
        'Because censoring makes the effective risk sets change at every event time.',
        'Because survival times are normally distributed.',
        'Because the number at risk is constant throughout the study.',
        'Because the Kaplan-Meier estimate is a straight line.',
      ],
      correctIndex: 0,
      explanation:
        'Greenwood\'s formula sums the contributions d_j/[n_j(n_j - d_j)] over event times, which accounts for the shrinking risk set caused by deaths and censoring. A single fixed binomial SE would ignore that.',
      source: '§2.2.1',
    },
    {
      id: 'ch02-q06',
      prompt:
        'A multicentre trial compares two treatments, and centres differ in their baseline survival. A stratified log-rank test is used with centre as the stratum. What is its null hypothesis?',
      options: [
        'There is no difference in survival between centres.',
        'There is no treatment difference after allowing for centre.',
        'The treatment effect differs between centres.',
        'The censoring distribution is the same in every centre.',
      ],
      correctIndex: 1,
      explanation:
        'The stratified log-rank test combines within-centre U- and V-statistics into one overall test. Its null hypothesis is no treatment difference, after allowing for the stratifying variable (centre).',
      source: '§2.8',
    },
  ],
}
