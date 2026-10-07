import type { Chapter } from '../types'

/**
 * Chapter 3 - The Cox regression model (Collett, 4th ed.).
 * Proportional hazards, partial likelihood, interpretation of coefficients,
 * model comparison and measures of predictive ability.
 */
export const chapter03: Chapter = {
  number: 3,
  slug: 'cox-regression',
  title: 'The Cox regression model',
  summary:
    'The semi-parametric proportional hazards model: partial likelihood, hazard ratio interpretation, adjusting for covariates, model comparison and discrimination.',
  bookSections: '§3.1-3.12',
  flashcards: [
    {
      id: 'ch03-f01',
      front: 'Write down the Cox proportional hazards model.',
      back: 'h_i(t) = exp(beta_1 x_1i + ... + beta_p x_pi) h_0(t), often written h_i(t) = exp(beta\'x_i) h_0(t). No distribution is assumed for the survival times, so it is a semi-parametric model.',
      source: '§3.1.2',
    },
    {
      id: 'ch03-f02',
      front: 'What is the baseline hazard function h_0(t)?',
      back: 'The hazard function for an individual for whom every explanatory variable in the model equals zero. It is common to all individuals and is left unspecified in the Cox model.',
      source: '§3.1.2',
    },
    {
      id: 'ch03-f03',
      front: 'Why is there no constant term in the linear component of a Cox model?',
      back: 'A constant beta_0 could be absorbed by rescaling the baseline hazard (dividing h_0(t) by exp(beta_0)), so it cancels. The model is therefore a linear model for the log-hazard ratio, log{h_i(t)/h_0(t)} = beta\'x_i.',
      source: '§3.1.2',
    },
    {
      id: 'ch03-f04',
      front: 'How do you interpret a coefficient beta_j in a Cox model?',
      back: 'beta_j is the change in the log-hazard ratio for a one-unit increase in x_j, with all other covariates held fixed (i.e. adjusted for the other terms). The hazard ratio is exp(beta_j).',
      source: '§3.9.1',
    },
    {
      id: 'ch03-f05',
      front: 'What is the hazard ratio for a change of r units in a continuous covariate?',
      back: 'The log-hazard ratio changes by r*beta_j, so the hazard ratio is exp(r*beta_j) with standard error r*se(beta_j). Because the covariate enters linearly, this ratio does not depend on the starting value of x.',
      source: '§3.9.1',
    },
    {
      id: 'ch03-f06',
      front: 'How is a factor with several levels fitted in a Cox model?',
      back: 'Using a - 1 indicator variables, with the first level as the baseline (its coefficient set to zero). Then gamma_j = log{h_j(t)/h_0(t)} is the log-hazard ratio of level j relative to the baseline level.',
      source: '§3.2.2, §3.9.2',
    },
    {
      id: 'ch03-f07',
      front: 'Write the partial likelihood function for the Cox model.',
      back: 'L(beta) = product over the r death times of exp(beta\'x_(j)) / sum over l in R(t_(j)) of exp(beta\'x_l), where x_(j) is the covariate vector of the individual dying at t_(j) and R(t_(j)) is the risk set.',
      source: '§3.3',
    },
    {
      id: 'ch03-f08',
      front: 'What is the risk set R(t), and how do censored observations enter the partial likelihood?',
      back: 'R(t) is the set of individuals alive and uncensored just before time t. Censored observations never appear in the numerator, but they do appear in the risk-set sums at earlier death times, so they still inform the estimate.',
      source: '§3.3',
    },
    {
      id: 'ch03-f09',
      front: 'Why is the Cox likelihood called a partial likelihood, and what does it depend on?',
      back: 'It is not a true likelihood because it uses only the ranking of the death times, not the actual times or the censored times. Inferences about beta depend only on the rank order of the survival times; the baseline hazard cancels from numerator and denominator.',
      source: '§3.3.1',
    },
    {
      id: 'ch03-f10',
      front: 'How is the Wald test used for a Cox coefficient?',
      back: 'Compute beta_j-hat / se(beta_j-hat) and compare with the standard normal (or square it for chi-squared on 1 df). It tests H0: beta_j = 0 in the presence of the other terms in the model; correlated covariates make separate Wald tests hard to interpret.',
      source: '§3.4',
    },
    {
      id: 'ch03-f11',
      front: 'How is a confidence interval for a hazard ratio obtained?',
      back: 'Form the interval beta-hat +/- z_(alpha/2) se(beta-hat) for the log-hazard ratio, then exponentiate both limits. This is preferred to psi-hat +/- z se(psi-hat) because the log-hazard ratio is closer to normal.',
      source: '§3.4.1',
    },
    {
      id: 'ch03-f12',
      front: 'How do you compare two nested Cox models?',
      back: 'Use the difference in -2 log L-hat: it is chi-squared on q df, where q is the number of extra parameters in the larger model. A small difference means the extra terms are unnecessary, so the simpler model is preferred. -2 log L-hat cannot be used on its own because it depends on the sample size.',
      source: '§3.5',
    },
    {
      id: 'ch03-f13',
      front: 'State the AIC and BIC for model comparison.',
      back: 'AIC = -2 log L-hat + 2q and BIC = -2 log L-hat + q log d, where q is the number of parameters and d is the number of uncensored observations. Smaller values indicate better models; unlike -2 log L-hat, they penalise unnecessary terms.',
      source: '§3.6.1',
    },
    {
      id: 'ch03-f14',
      front: 'What does the concordance (c-) statistic measure?',
      back: 'An estimate of the probability that, for a pair of individuals, the one with the shorter survival time has the greater hazard (lower predicted survival). Values near 0.5 mean no discrimination; values above about 0.7 indicate reasonable predictive ability. It is affected by the censoring pattern.',
      source: '§3.12.1',
    },
  ],
  questions: [
    {
      id: 'ch03-q01',
      prompt:
        'A Cox model for tumour staining gives beta-hat = 0.908 with se = 0.501, so the estimated hazard ratio is exp(0.908) = 2.48 and the 95% CI for the hazard ratio is (0.93, 6.62). What is the correct conclusion?',
      options: [
        'Positively stained women have a significantly higher hazard of death, because the hazard ratio exceeds 1.',
        'There is evidence of a different survival experience, but the CI barely includes 1, so the evidence is weak.',
        'The hazard ratio cannot be interpreted because the model has no baseline hazard.',
        'The CI excludes 1, so there is no evidence of a difference.',
      ],
      correctIndex: 1,
      explanation:
        'The point estimate (2.48) suggests a higher hazard for positively stained tumours, but the 95% CI (0.93, 6.62) only just includes 1, so the evidence for a difference is weak rather than strong.',
      source: '§3.4.2',
    },
    {
      id: 'ch03-q02',
      prompt:
        'A model contains covariates X1, X2 and X3. The Wald test for X2 has p = 0.42. What does this mean?',
      options: [
        'X2 has no association with the hazard at all.',
        'X2 is not needed in the model in the presence of X1 and X3.',
        'X1 and X3 must be removed before X2 can be assessed.',
        'The model must be refitted without a baseline hazard.',
      ],
      correctIndex: 1,
      explanation:
        'The Wald test addresses beta_2 = 0 in the presence of X1 and X3. It says that X2 adds nothing given the other terms; because coefficients can change when other terms are removed, this does not by itself prove X2 is irrelevant.',
      source: '§3.4',
    },
    {
      id: 'ch03-q03',
      prompt:
        'Two nested Cox models are compared. The smaller has -2 log L-hat = 173.97 and the larger adds one covariate with -2 log L-hat = 168.02. What do you conclude?',
      options: [
        'The difference 5.95 on 1 df is significant, so the additional covariate improves the model.',
        'The difference 5.95 cannot be tested without the AIC.',
        'The larger model is worse because -2 log L-hat is smaller.',
        'The models are not comparable because they are not nested.',
      ],
      correctIndex: 0,
      explanation:
        'The likelihood ratio statistic is 173.97 - 168.02 = 5.95 on q = 1 df, which exceeds the 5% critical value 3.84, so the extra covariate significantly improves the fit.',
      source: '§3.5',
    },
    {
      id: 'ch03-q04',
      prompt:
        'Which statement about the partial likelihood of the Cox model is correct?',
      options: [
        'It requires the baseline hazard function to be specified.',
        'It uses only the rank order of the death times, and censored times enter risk sets but not numerators.',
        'It is maximised by the Kaplan-Meier estimate.',
        'It ignores all censored observations completely.',
      ],
      correctIndex: 1,
      explanation:
        'The partial likelihood compares each death with the risk set at that death time, so only the ranking of death times matters. The baseline hazard cancels, and censored individuals contribute to risk sets before their censoring time.',
      source: '§3.3.1',
    },
    {
      id: 'ch03-q05',
      prompt:
        'A Cox model is fitted to 200 patients, of whom 120 die. Two models differ by two additional parameters. Which comparison is valid?',
      options: [
        'AIC uses 2 * 2 = 4 as the penalty; BIC uses 2 * log(200) as the penalty.',
        'AIC and BIC always select the same model.',
        'AIC uses the number of censored observations as the penalty.',
        'Neither AIC nor BIC can be used because the models are nested.',
      ],
      correctIndex: 0,
      explanation:
        'AIC adds 2q where q is the number of parameters (here an extra 4 for two terms). BIC adds q log d where d is the number of uncensored observations (here 120), so it uses 2 log 120. BIC penalises complexity more strongly and the two criteria can disagree.',
      source: '§3.6.1',
    },
    {
      id: 'ch03-q06',
      prompt:
        'A fitted Cox model has a c-statistic of 0.52. How should this be interpreted?',
      options: [
        'Excellent discrimination; the model ranks patients almost perfectly.',
        'The model has little ability to discriminate between shorter and longer survival times.',
        'The model is invalid and must be discarded.',
        'The c-statistic is a measure of calibration, not discrimination.',
      ],
      correctIndex: 1,
      explanation:
        'A c-statistic near 0.5 corresponds to no predictive ability (like flipping a coin). Values above about 0.7 are usually taken to indicate reasonable discrimination. Models with a c-statistic of 0.52 should be treated with caution.',
      source: '§3.12.1',
    },
  ],
}
