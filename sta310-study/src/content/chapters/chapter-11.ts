import type { Chapter } from '../types'

/**
 * Chapter 11 - Non-proportional hazards (Collett, 4th ed.).
 * Modelling the probability of an event by a fixed time, stratified proportional
 * hazards models, restricted mean survival, and institutional comparisons.
 */
export const chapter11: Chapter = {
  number: 11,
  slug: 'non-proportional-hazards',
  title: 'Non-proportional hazards',
  summary:
    'What to do when hazards are not proportional: modelling event probabilities by a set time, stratified and piecewise models, restricted mean survival time, and risk-adjusted institutional comparisons.',
  bookSections: '§11.1-11.4',
  flashcards: [
    {
      id: 'ch11-f01',
      front: 'Give two clinical situations in which hazards are clearly not proportional.',
      back: 'Comparing surgery with chemotherapy: surgery carries an early risk of death from the operation itself but gives a long-term advantage, so the hazards cross over. Similarly, aggressive chemotherapy may give a long-term benefit at the cost of short-term excess mortality.',
      source: '§11.1',
    },
    {
      id: 'ch11-f02',
      front: 'When the hazards are not proportional, what summary measures are available instead of the hazard ratio?',
      back: 'Restrict attention to a fixed time tau and model the probability of an event by tau (or of surviving beyond tau), using a complementary log-log model for a binary response. Alternatively summarise the effect with the restricted mean survival time. A hazard ratio is no longer a single meaningful number when hazards are non-proportional.',
      source: '§11.1, §11.3',
    },
    {
      id: 'ch11-f03',
      front: 'Write the complementary log-log model for the probability of an event by time tau.',
      back: 'log[-log{1 - p_i(tau)}] = beta_0 + beta_1 x_1i + ... + beta_p x_pi, where p_i(tau) is the probability that the ith individual has an event by tau. It is fitted to a binary response that is unity if the event occurred before tau. The beta coefficients are log-hazard ratios and exp(beta_0) relates to the baseline survivor function at tau.',
      source: '§11.1.1',
    },
    {
      id: 'ch11-f04',
      front: 'What are the drawbacks of analysing only survival rates at a fixed time tau?',
      back: 'Every patient must be followed until tau, death data cannot be used before then, and the trial cannot easily be stopped early for a treatment difference. The approach also discards the timing information in the survival times.',
      source: '§11.1',
    },
    {
      id: 'ch11-f05',
      front: 'Describe the stratified proportional hazards model.',
      back: 'h_ij(t) = exp(beta x_ij) h_0j(t): a separate baseline hazard h_0j(t) is allowed for each of the g strata, while the covariate effects beta are common to all strata. The stratifying variable itself cannot appear in the linear component.',
      source: '§11.2',
    },
    {
      id: 'ch11-f06',
      front: 'What is the relationship between the stratified proportional hazards model and the stratified log-rank test?',
      back: 'When two or more groups of survival data are compared, the stratified proportional hazards model is equivalent to the stratified log-rank test. Nested stratified models are compared through the change in -2 log L-hat in the usual way.',
      source: '§11.2',
    },
    {
      id: 'ch11-f07',
      front: 'How can non-proportional hazards between two treatments be modelled directly?',
      back: 'With a piecewise Cox model: divide the time scale into intervals and define time-dependent indicator variables that are unity only in a given interval for the new treatment. The log-hazard ratio is then beta_1 in the first interval, beta_1 + beta_2 in the second, and so on, so the treatment effect is estimated separately in each period.',
      source: '§11.2.1',
    },
    {
      id: 'ch11-f08',
      front: 'Define the restricted mean survival time to time t_0.',
      back: 'mu(t_0) = E(min{T, t_0}), the expected survival time over the period up to t_0. It equals the area under the survivor function from 0 to t_0, so with time in months mu(24) is the average number of months survived in a 24-month period, i.e. the two-year life expectancy.',
      source: '§11.3',
    },
    {
      id: 'ch11-f09',
      front: 'How is the restricted mean survival time estimated from a Kaplan-Meier curve?',
      back: 'mu-hat(t) = sum over event times up to t of S-hat(t_(j-1)) times (t_(j) - t_(j-1)): a step-wise sum of rectangles under the Kaplan-Meier curve. The difference in restricted means between two groups is an unadjusted summary of the treatment effect that does not require proportional hazards.',
      source: '§11.3',
    },
    {
      id: 'ch11-f10',
      front: 'What are pseudo-values and how are they used with restricted mean survival?',
      back: 'The ith pseudo-value is z_i = n * mu-hat(t_0) - (n - 1) * mu-hat(-i)(t_0), where mu-hat(-i) is the restricted mean computed with the ith observation omitted. It measures that individual\'s contribution and is defined even for censored observations. The pseudo-values are then modelled with a generalised linear model to relate restricted mean survival to covariates.',
      source: '§11.3.1',
    },
    {
      id: 'ch11-f11',
      front: 'Define the risk-adjusted failure rate (RAFR) used for institutional comparisons.',
      back: 'RAFR = (observed failure rate / expected failure rate) times the overall failure rate, evaluated at a given time. The observed rate comes from the institution\'s Kaplan-Meier estimate, the expected rate from the risk-adjusted survivor function (averaging the model-based survivor functions of its patients), and the overall rate from all institutions combined. The risk-adjusted survival rate is RASR = 1 - RAFR.',
      source: '§11.4',
    },
    {
      id: 'ch11-f12',
      front: 'What is the advantage of estimating the RAFR from numbers of failures rather than rates?',
      back: 'It is more convenient to use (observed number of failures / expected number of failures) times the overall failure rate. The expected number of failures follows directly from the cumulative hazard: for a patient who survives to t_ij, H_ij(t_ij) is the expected number of failures during their follow-up.',
      source: '§11.4',
    },
  ],
  questions: [
    {
      id: 'ch11-q01',
      prompt:
        'Two treatments have clearly non-proportional hazards, with a short-term disadvantage and a long-term advantage for the new treatment. Why is a single hazard ratio misleading?',
      options: [
        'Because the hazard ratio is undefined when there is censoring.',
        'Because the hazard ratio changes with time, so one number cannot summarise the effect.',
        'Because the log-rank test is invalid in this situation.',
        'Because hazard ratios can only be computed for continuous covariates.',
      ],
      correctIndex: 1,
      explanation:
        'A hazard ratio is only a single meaningful summary when the hazards are proportional. When they cross or diverge, the ratio depends on time, so summary measures such as a survival probability at a fixed time or the restricted mean survival time are preferable.',
      source: '§11.1',
    },
    {
      id: 'ch11-q02',
      prompt:
        'A complementary log-log model is fitted to a binary indicator of whether an ulcer recurred within 12 months. What is the response being modelled?',
      options: [
        'The hazard function at each event time.',
        'The probability of an event occurring by 12 months, transformed as log[-log{1 - p_i(tau)}].',
        'The median time to recurrence.',
        'The cumulative hazard at 12 months.',
      ],
      correctIndex: 1,
      explanation:
        'The complementary log-log transformation of the probability of an event by tau is linear in the covariates. Differences in the deviance between nested models are compared with a chi-squared distribution in the usual way.',
      source: '§11.1.1',
    },
    {
      id: 'ch11-q03',
      prompt: 'In a stratified proportional hazards model, what is assumed?',
      options: [
        'A common baseline hazard and different covariate effects in each stratum.',
        'A different baseline hazard in each stratum and common covariate effects across strata.',
        'Different baseline hazards and different covariate effects in each stratum.',
        'Nothing at all; it is a non-parametric method.',
      ],
      correctIndex: 1,
      explanation:
        'h_ij(t) = exp(beta x_ij) h_0j(t) allows the baseline hazard to differ between strata while the beta coefficients are shared. This is appropriate when overall hazards are not proportional but are proportional within subgroups.',
      source: '§11.2',
    },
    {
      id: 'ch11-q04',
      prompt: 'What does the restricted mean survival time to t_0 represent?',
      options: [
        'The median survival time, truncated at t_0.',
        'The expected value of the minimum of the survival time and t_0, equal to the area under the survivor function from 0 to t_0.',
        'The hazard accumulated up to t_0.',
        'The probability of surviving beyond t_0.',
      ],
      correctIndex: 1,
      explanation:
        'mu(t_0) = E(min{T, t_0}) is the average time survived within the window up to t_0. It can be read as the area under the Kaplan-Meier curve and has a direct interpretation as life expectancy over that period.',
      source: '§11.3',
    },
    {
      id: 'ch11-q05',
      prompt:
        'In a piecewise Cox model for a treatment effect that changes over time, what is the role of the variables X2(t) and X3(t)?',
      options: [
        'They are time-fixed indicators of the treatment group.',
        'They are time-dependent indicators that are unity only in a particular time interval for patients on the new treatment, so the log-hazard ratio differs between intervals.',
        'They are used to stratify the baseline hazard.',
        'They replace the treatment variable entirely.',
      ],
      correctIndex: 1,
      explanation:
        'Defining indicators that switch on only within specified intervals makes the model time-dependent, so the treatment log-hazard ratio is beta_1 for the first interval, beta_1 + beta_2 for the second, and so on. This both models and tests non-proportionality.',
      source: '§11.2.1',
    },
    {
      id: 'ch11-q06',
      prompt: 'How is the risk-adjusted failure rate for an institution calculated?',
      options: [
        'As the ratio of its observed failure rate to its expected failure rate, multiplied by the overall failure rate.',
        'As the difference between its observed and expected failure rates.',
        'As the average of its Kaplan-Meier estimates at each event time.',
        'As the ratio of its number of patients to the total number of patients.',
      ],
      correctIndex: 0,
      explanation:
        'RAFR = (observed failure rate / expected failure rate) x overall failure rate, where the expected rate comes from the risk-adjusted survivor function for that institution\'s patients. The risk-adjusted survival rate is then 1 - RAFR.',
      source: '§11.4',
    },
  ],
}
