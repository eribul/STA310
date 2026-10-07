import type { Chapter } from '../types'

/**
 * Chapter 15 - Sample size requirements for a survival study (Collett, 4th ed.).
 * The required number of deaths, the probability of death over an accrual and
 * follow-up period, and hence the required number of patients.
 */
export const chapter15: Chapter = {
  number: 15,
  slug: 'sample-size',
  title: 'Sample size requirements for a survival study',
  summary:
    'Planning a survival study: the number of deaths needed for a given power, the probability of death during accrual and follow-up, and the resulting number of patients.',
  bookSections: '§15.1-15.3',
  flashcards: [
    {
      id: 'ch15-f01',
      front: 'Why is the number of deaths, rather than the number of patients, the starting point for sample size calculations?',
      back: 'In a survival study censoring means the actual survival times of all patients are usually not observed. The power of the log-rank test depends on the number of deaths observed, not on the total number of patients recruited. So the required number of deaths is calculated first, and the number of patients follows.',
      source: '§15.1, §15.2',
    },
    {
      id: 'ch15-f02',
      front: 'Define the power of a test and the type II error rate.',
      back: 'The power, 1 - beta, is the probability of declaring the observed log-hazard ratio significantly different from zero when the true value is theta_R (the reference value). Here beta is the probability of not rejecting a null hypothesis that is false. Typical choices are alpha = 0.05 and beta = 0.1, giving 90% power.',
      source: '§15.2',
    },
    {
      id: 'ch15-f03',
      front: 'Give the formula for the required number of deaths with equal allocation.',
      back: 'd = 4 (z_(alpha/2) + z_beta)^2 / theta_R^2, often written d = 4 c(alpha, beta) / theta_R^2, where theta_R is the log-hazard ratio to be detected, c(alpha, beta) = (z_(alpha/2) + z_beta)^2 is read from a table, and z points come from the standard normal distribution.',
      source: '§15.2',
    },
    {
      id: 'ch15-f04',
      front: 'How does the required number of deaths change if the allocation to the two groups is unequal?',
      back: 'If a proportion pi of individuals goes to Group I and 1 - pi to Group II, the total number of deaths required is d = c(alpha, beta) / {pi (1 - pi) theta_R^2}. An imbalance increases the total number of deaths needed, because the factoring is maximised when pi = 0.5.',
      source: '§15.2',
    },
    {
      id: 'ch15-f05',
      front: 'How is the reference log-hazard ratio theta_R chosen in practice?',
      back: 'It reflects the treatment difference that is important to detect, lying between the minimum worthwhile improvement and the maximum envisaged improvement. It may be specified through a desired hazard ratio, a change in the median survival time, or a difference in the probability of survival beyond a given time.',
      source: '§15.2',
    },
    {
      id: 'ch15-f06',
      front: 'Why is some judicious rounding up of the calculated number of deaths recommended?',
      back: 'The derivation of the formula uses an approximation, which means the calculated number of deaths could be an underestimate. Rounding the answer up compensates for this.',
      source: '§15.2',
    },
    {
      id: 'ch15-f07',
      front: 'Write the formula for the required number of patients.',
      back: 'n = d / P(death), where d is the required number of deaths and P(death) is the probability that a patient dies during the study. The probability of death depends on the accrual period of length a and the follow-up period of length f.',
      source: '§15.3',
    },
    {
      id: 'ch15-f08',
      front: 'Give the expression for the probability of death under uniform recruitment.',
      back: 'P(death) = 1 - (1/6) {S-bar(f) + 4 S-bar(0.5a + f) + S-bar(a + f)}, where S-bar(t) is the average of the survivor functions on the standard and new treatments at time t. The expression comes from integrating the survivor function over the accrual period and approximating the integral by Simpson\'s rule.',
      source: '§15.3',
    },
    {
      id: 'ch15-f09',
      front: 'Why does a shorter follow-up period mean more patients are needed?',
      back: 'With a smaller f fewer patients will have died by the end of the study, so P(death) is smaller and, from n = d / P(death), a larger number of patients must be recruited to observe the required number of deaths. If f is very small the number of patients needed becomes substantial.',
      source: '§15.3',
    },
    {
      id: 'ch15-f10',
      front: 'How is the recruitment rate used to choose the length of the accrual period?',
      back: 'If the rate is m patients per month and the accrual period is a months, the expected number of deaths is m a times P(death). The values of a and f that make this close to the required d are found numerically, for example by tabulating the required number of patients over combinations of a and f.',
      source: '§15.3',
    },
    {
      id: 'ch15-f11',
      front: 'Which statistical test underlies the sample size formulae, and what is the alternative?',
      back: 'The formulae are based on the log-rank test. Since the log-rank test is equivalent to the score test of the null hypothesis of equal hazards in the Cox regression model, the same formulae can be used when a Cox-model analysis is planned.',
      source: '§15.1',
    },
  ],
  questions: [
    {
      id: 'ch15-q01',
      prompt: 'What is the power of a significance test?',
      options: [
        'The probability of rejecting the null hypothesis when it is true.',
        'The probability of rejecting the null hypothesis when it is false, equal to 1 - beta.',
        'The probability of not rejecting the null hypothesis when it is true.',
        'The significance level of the test, equal to alpha.',
      ],
      correctIndex: 1,
      explanation:
        'Power is the chance of detecting a real effect of size theta_R. In a survival study the power of the log-rank test depends on the number of deaths observed, which is why the calculation starts from the required number of deaths.',
      source: '§15.2',
    },
    {
      id: 'ch15-q02',
      prompt:
        'A study is designed to detect a log-hazard ratio of theta_R = 0.5 with alpha = 0.05 and 90% power, for which c(alpha, beta) = 10.51. What is the required number of deaths?',
      options: ['10', '21', '42', '84'],
      correctIndex: 2,
      explanation:
        'Using d = 4 c(alpha, beta) / theta_R^2 = 4 x 10.51 / 0.25 = 42.04, so about 42 deaths are required (rounded up).',
      source: '§15.2',
    },
    {
      id: 'ch15-q03',
      prompt: 'What happens to the required number of deaths if patients are allocated unequally to the two treatment groups?',
      options: [
        'It decreases, because the larger group provides more information.',
        'It increases, because the formula contains pi (1 - pi) in the denominator, which is maximised at equal allocation.',
        'It is unchanged; only the power is affected.',
        'It cannot be calculated without knowing the accrual rate.',
      ],
      correctIndex: 1,
      explanation:
        'The total required deaths is d = c(alpha, beta) / {pi (1 - pi) theta_R^2}. Since pi (1 - pi) is largest when pi = 0.5, any imbalance raises the total number of deaths needed.',
      source: '§15.2',
    },
    {
      id: 'ch15-q04',
      prompt: 'Why is Simpson\'s rule used in the sample size calculation?',
      options: [
        'To estimate the hazard ratio from the pilot data.',
        'To approximate the integral of the survivor function over the accrual period when deriving the probability of death.',
        'To allocate patients to the two treatment groups.',
        'To adjust for unequal allocation between groups.',
      ],
      correctIndex: 1,
      explanation:
        'Under uniform recruitment the probability of death is 1 minus the average of the survivor function over the study, giving an integral of S(u) from f to a + f. Simpson\'s rule approximates this with the three-point expression using S-bar(f), S-bar(0.5a + f) and S-bar(a + f).',
      source: '§15.3',
    },
    {
      id: 'ch15-q05',
      prompt:
        'Two designs both need 40 deaths. Design A has a long follow-up period and design B a short one. Which requires more patients?',
      options: [
        'Design A, because patients are followed longer.',
        'Design B, because a shorter follow-up gives a lower probability of death, so more patients are needed to observe 40 deaths.',
        'They require the same number, because the number of deaths is fixed.',
        'It depends only on the significance level.',
      ],
      correctIndex: 1,
      explanation:
        'Since n = d / P(death), a shorter follow-up period lowers the probability of dying during the study and therefore increases the number of patients that must be recruited to observe the required number of deaths.',
      source: '§15.3',
    },
    {
      id: 'ch15-q06',
      prompt: 'Why is the first step in planning a survival study to calculate the number of deaths?',
      options: [
        'Because deaths are cheaper to observe than patients.',
        'Because the power of the analysis depends on the number of deaths observed, whereas censoring means not every patient contributes an event time.',
        'Because the median survival time is always known in advance.',
        'Because the number of patients is fixed by the funding available.',
      ],
      correctIndex: 1,
      explanation:
        'The information about the treatment effect comes from the events. Once the required number of deaths is known, the number of patients follows from the probability of death during accrual and follow-up.',
      source: '§15.1, §15.3',
    },
  ],
}
