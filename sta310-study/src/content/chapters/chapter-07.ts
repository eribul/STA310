import type { Chapter } from '../types'

/**
 * Chapter 7 - Model checking in parametric models (Collett, 4th ed.).
 * Residuals for accelerated failure time models, comparing observed with
 * fitted survivor functions, and testing proportional hazards in the Weibull model.
 */
export const chapter07: Chapter = {
  number: 7,
  slug: 'model-checking-parametric',
  title: 'Model checking in parametric models',
  summary:
    'Residual diagnostics for parametric (AFT) models, graphical comparison of fitted and observed survivor functions, and how to test proportional hazards in a Weibull model.',
  bookSections: '§7.1-7.5',
  flashcards: [
    {
      id: 'ch07-f01',
      front: 'Define the standardised residual for an accelerated failure time model.',
      back: 'r_Si = (log t_i - mu-hat - alpha-hat_1 x_1i - ... - alpha-hat_p x_pi) / sigma-hat. It has the form "observation minus fitted value" on the log-time scale and, if the model is correct, behaves like a (possibly censored) sample from the distribution of the error term of the model.',
      source: '§7.1.1',
    },
    {
      id: 'ch07-f02',
      front: 'What distribution are the standardised residuals expected to follow for a Weibull AFT model?',
      back: 'A Gumbel distribution, which is the distribution of the error term of the Weibull AFT model. Equivalently, -log S(r_Si) should be approximately unit exponential when the model is correct.',
      source: '§7.1.1',
    },
    {
      id: 'ch07-f03',
      front: 'Define the Cox-Snell residual for a parametric model.',
      back: 'r_Ci = H_i-hat(t_i) = -log S_i-hat(t_i), the estimated cumulative hazard at the observed time under the fitted parametric model. If the model is correct these behave like a censored sample from a unit exponential distribution, exactly as in the Cox model.',
      source: '§7.1.2',
    },
    {
      id: 'ch07-f04',
      front: 'How do the standardised and Cox-Snell residuals of a parametric model relate?',
      back: 'r_Ci = -log S_epsilon(r_Si): the Cox-Snell residual is a function of the standardised residual. Assessing whether the standardised residuals follow the assumed error distribution is therefore equivalent to assessing whether the Cox-Snell residuals are unit exponential.',
      source: '§7.1.2',
    },
    {
      id: 'ch07-f05',
      front: 'Define the martingale residual for a parametric model and give its properties.',
      back: 'r_Mi = delta_i - r_Ci, i.e. observed minus model-predicted number of events. For an AFT model these residuals sum to zero, but they are not symmetrically distributed about zero, and unusually large values indicate poorly fitted observations.',
      source: '§7.1.3',
    },
    {
      id: 'ch07-f06',
      front: 'What is the purpose of deviance residuals in parametric modelling?',
      back: 'They are a transformation of the martingale residuals designed to be roughly symmetric about zero, making residual plots easier to read: r_Di = sign(r_Mi) * sqrt(-2 {r_Mi + delta_i log(delta_i - r_Mi)}). For an AFT model they are often defined as -r_Di so that their sign matches the standardised residuals.',
      source: '§7.1.4',
    },
    {
      id: 'ch07-f07',
      front: 'What are score residuals and what property do they satisfy?',
      back: 'They are the individual contributions to the derivatives of the log-likelihood with respect to the parameters (mu, sigma and the alpha_j), evaluated at the maximum likelihood estimates. Because the log-likelihood is maximised, the score residuals must sum to zero. The score residuals for the covariates parallel the Schoenfeld residuals of the Cox model.',
      source: '§7.1.5',
    },
    {
      id: 'ch07-f08',
      front: 'How are fitted and observed survivor functions compared for a single sample?',
      back: 'Plot the fitted parametric survivor function, which is a continuous curve, against the Kaplan-Meier step-function estimate. Close agreement indicates that the fitted model summarises the data well. When there are factors, compare within each group; with many covariates, form groups from the risk score and compare within those.',
      source: '§7.3',
    },
    {
      id: 'ch07-f09',
      front: 'In a Weibull model, what does proportional hazards across groups correspond to, and how is it tested?',
      back: 'Proportional hazards across g groups corresponds to a common Weibull shape parameter gamma across the groups. Test it by comparing a model with separate shape parameters for each group (fit separately, sum the -2 log L-hat values) with one that has a common shape parameter. The difference is chi-squared on g - 1 df.',
      source: '§7.5',
    },
    {
      id: 'ch07-f10',
      front: 'How do you interpret a non-significant change in -2 log L-hat when constraining the Weibull shape parameters to be equal?',
      back: 'There is no evidence that the shape parameters differ, so the proportional hazards assumption is justified. In Example 7.4 the change is 0.10 on 1 df, so the two treatment groups can be taken to share a common shape parameter.',
      source: '§7.5',
    },
    {
      id: 'ch07-f11',
      front: 'What plots are most useful for assessing the fit of an AFT model?',
      back: 'Plot the standardised (or deviance) residuals against the rank order of survival times, the risk score, or covariates, and look for systematic patterns or outlying observations. Supplement with a cumulative hazard plot of the Cox-Snell residuals and with a comparison of fitted and Kaplan-Meier survivor functions.',
      source: '§7.3',
    },
  ],
  questions: [
    {
      id: 'ch07-q01',
      prompt:
        'In a Weibull model, the assumption of proportional hazards across several groups is equivalent to which assumption?',
      options: [
        'The scale parameters are equal across groups.',
        'The shape parameter gamma is the same in each group.',
        'All groups have the same median survival time.',
        'The error term is normally distributed.',
      ],
      correctIndex: 1,
      explanation:
        'The Weibull hazard is lambda gamma t^(gamma-1). A common shape parameter gamma across groups gives proportional hazards; group differences then appear through the scale parameter lambda (which changes with the covariates).',
      source: '§7.5',
    },
    {
      id: 'ch07-q02',
      prompt:
        'A Weibull model with separate shape parameters for g = 3 groups is compared with one with a common shape. Which null distribution is used for the change in -2 log L-hat?',
      options: [
        'Chi-squared on 1 df',
        'Chi-squared on 2 df',
        'Chi-squared on 3 df',
        'Standard normal',
      ],
      correctIndex: 1,
      explanation:
        'Constraining g groups to share one shape parameter imposes g - 1 = 2 restrictions, so the change in -2 log L-hat is compared with chi-squared on g - 1 = 2 df.',
      source: '§7.5',
    },
    {
      id: 'ch07-q03',
      prompt:
        'Which two types of residual for a parametric model are guaranteed to sum to zero?',
      options: [
        'Cox-Snell and deviance residuals',
        'Martingale and score residuals',
        'Standardised and Cox-Snell residuals',
        'Deviance and Schoenfeld residuals',
      ],
      correctIndex: 1,
      explanation:
        'Martingale residuals sum to zero by construction (observed minus expected events), and score residuals sum to zero because they are the derivatives of the log-likelihood at its maximum. Deviance residuals are a nonlinear transformation and do not sum to zero.',
      source: '§7.1.3, §7.1.5',
    },
    {
      id: 'ch07-q04',
      prompt:
        'For a Weibull accelerated failure time model, the standardised residuals would be expected to follow which distribution if the model is correct?',
      options: ['Standard normal', 'Gumbel', 'Uniform', 'Log-logistic'],
      correctIndex: 1,
      explanation:
        'The Weibull AFT model is log T = mu + alpha\'x + sigma*epsilon where epsilon has a Gumbel distribution. The standardised residuals estimate epsilon, so a plot of them should resemble a (censored) Gumbel sample.',
      source: '§7.1.1',
    },
    {
      id: 'ch07-q05',
      prompt:
        'A single-sample parametric model is fitted. Which comparison best assesses whether it summarises the data well?',
      options: [
        'Compare the fitted survivor function with the Kaplan-Meier estimate.',
        'Compare the AIC of the parametric model with the AIC of a Cox model.',
        'Plot a histogram of the residuals and require normality.',
        'Compare the number of censored observations with the number of events.',
      ],
      correctIndex: 0,
      explanation:
        'With no covariates, the continuous fitted survivor function can be compared directly with the Kaplan-Meier step function. Close agreement indicates the model is an appropriate summary; discrepancies point to an inadequate distributional assumption.',
      source: '§7.3',
    },
    {
      id: 'ch07-q06',
      prompt:
        'In Example 7.4 the change in -2 log L-hat when the two Weibull shape parameters are constrained to be equal is 0.10 on 1 df. What is the conclusion?',
      options: [
        'There is strong evidence that the hazards are not proportional.',
        'The two shape parameters may be taken to be equal, so proportional hazards is reasonable.',
        'The Weibull model cannot be used for these data.',
        'The sample size is too small to test the assumption.',
      ],
      correctIndex: 1,
      explanation:
        'A change of 0.10 is far from significant on 1 df, so there is no evidence against a common shape parameter. The proportional hazards assumption is therefore justified for the Weibull model.',
      source: '§7.5',
    },
  ],
}
