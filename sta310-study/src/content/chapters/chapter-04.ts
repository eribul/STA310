import type { Chapter } from '../types'

/**
 * Chapter 4 - Model checking in the Cox regression model (Collett, 4th ed.).
 * Residuals and influence diagnostics, graphical assessment of fit, and tests
 * of the proportional hazards assumption.
 */
export const chapter04: Chapter = {
  number: 4,
  slug: 'model-checking-cox',
  title: 'Model checking in the Cox regression model',
  summary:
    'Residuals (Cox-Snell, martingale, deviance, Schoenfeld), influence diagnostics, and how to check and test the proportional hazards assumption.',
  bookSections: '§4.1-4.5',
  flashcards: [
    {
      id: 'ch04-f01',
      front: 'Define the Cox-Snell residual for the Cox model and state its distribution if the model is correct.',
      back: 'r_Ci = exp(beta-hat\'x_i) * H_0-hat(t_i) = -log S_i-hat(t_i). If the fitted model is correct these behave like a censored sample from a unit exponential distribution.',
      source: '§4.1.1',
    },
    {
      id: 'ch04-f02',
      front: 'How is a cumulative hazard plot of the Cox-Snell residuals interpreted?',
      back: 'Plot -log S-hat(r_Ci) against r_Ci. If the model is good, the points lie close to a straight line through the origin with unit slope. In practice the plot is fairly insensitive and can look straight even when the model is wrong.',
      source: '§4.2.1',
    },
    {
      id: 'ch04-f03',
      front: 'What are modified Cox-Snell residuals?',
      back: 'Censored residuals under-state the true residual, so a positive excess is added to censored observations: add 1 (the mean of the unit exponential, Equation 4.3) or, as suggested by Crowley and Hu, add log 2 = 0.693 (the median, Equation 4.5).',
      source: '§4.1.2',
    },
    {
      id: 'ch04-f04',
      front: 'Define the martingale residual and its key properties.',
      back: 'r_Mi = delta_i - r_Ci, i.e. observed minus model-predicted number of events in (0, t_i). It lies in (-infinity, 1], is not symmetric, and sums to zero. Large positive values indicate individuals poorly fitted by the model.',
      source: '§4.1.3',
    },
    {
      id: 'ch04-f05',
      front: 'Why are deviance residuals preferred to martingale residuals in plots?',
      back: 'They transform the martingale residual to be approximately symmetric about zero, r_Di = sign(r_Mi) * sqrt(-2 {r_Mi + delta_i log(delta_i - r_Mi)}), which makes plots against the risk score much easier to read.',
      source: '§4.1.4',
    },
    {
      id: 'ch04-f06',
      front: 'Define the Schoenfeld residual and say when it is defined.',
      back: 'For each covariate at each event time it is the difference between the covariate value of the individual who dies and its risk-set-weighted expectation. It is defined only at event times, which is why it is the natural residual for checking proportional hazards.',
      source: '§4.1.5',
    },
    {
      id: 'ch04-f07',
      front: 'How are scaled Schoenfeld residuals used to check proportional hazards?',
      back: 'Grambsch and Therneau showed E(r*_Sji) is approximately beta_j(t_i) - beta_j-hat. Plotting r*_Sji + beta_j-hat against time (or a smooth of it) should be roughly horizontal if hazards are proportional; a trend indicates a time-varying coefficient.',
      source: '§4.4.2',
    },
    {
      id: 'ch04-f08',
      front: 'What is the Grambsch-Therneau test?',
      back: 'An overall test of the proportional hazards assumption, based on the scaled Schoenfeld residuals. A small p-value is evidence that the hazard ratio for at least one covariate changes over time, i.e. that PH does not hold.',
      source: '§4.4.2',
    },
    {
      id: 'ch04-f09',
      front: 'Describe the log-cumulative hazard plot and what it should look like under PH.',
      back: 'Group the data (categorising continuous covariates if needed), estimate S(t) within each group with Kaplan-Meier, then plot log H-hat(t) = log{-log S-hat(t)} against log t. If hazards are proportional the curves are parallel; the difference log H_i(t) - log H_0(t) = beta\'x_i does not depend on time.',
      source: '§4.4.1',
    },
    {
      id: 'ch04-f10',
      front: 'How can a time-dependent covariate be used to test proportional hazards?',
      back: 'Add a constructed variable such as x * log(t) to the Cox model. A significant coefficient for this term is evidence that the effect of x changes with time, i.e. that PH fails. Example 4.11 shows the age effect is not significant, supporting PH.',
      source: '§4.4.3',
    },
    {
      id: 'ch04-f11',
      front: 'What is the delta-beta statistic and what is it used for?',
      back: 'It measures how much a single parameter estimate changes when observation i is deleted from the fit. It is used as an influence diagnostic: large values identify observations that exert a disproportionate effect on a particular coefficient. Related diagnostics summarise influence on the whole coefficient vector or risk score.',
      source: '§4.3',
    },
    {
      id: 'ch04-f12',
      front: 'What does Collett recommend for routine model checking of a Cox model (Section 4.5)?',
      back: 'Plot deviance residuals against the risk score (and possibly against survival times or covariates) to find poorly fitted observations; supplement with influence diagnostics (delta-beta for key parameters, l_max for the whole vector); start PH checks with log-cumulative hazard plots but rely on scaled Schoenfeld residual plots and tests, including the overall Grambsch-Therneau test.',
      source: '§4.5',
    },
  ],
  questions: [
    {
      id: 'ch04-q01',
      prompt:
        'If a fitted Cox model is correct, how are the Cox-Snell residuals distributed?',
      options: [
        'Standard normal with mean 0 and variance 1.',
        'A censored sample from an exponential distribution with unit mean.',
        'Uniform on (0, 1).',
        'Chi-squared with p degrees of freedom.',
      ],
      correctIndex: 1,
      explanation:
        'For the true survivor function, -log S(T) has a unit exponential distribution; the Cox-Snell residuals are estimates of this quantity. Censoring makes the residual sample a censored one.',
      source: '§4.1.1',
    },
    {
      id: 'ch04-q02',
      prompt:
        'Which residual is defined only at event times and is the standard tool for checking the proportional hazards assumption?',
      options: [
        'Cox-Snell residual',
        'Martingale residual',
        'Schoenfeld residual (scaled)',
        'Standardised residual',
      ],
      correctIndex: 2,
      explanation:
        'The Schoenfeld residual, and in particular the scaled version of Grambsch and Therneau, is defined at event times and is specifically designed to detect time-varying covariate effects, i.e. departures from PH.',
      source: '§4.1.5, §4.4.2',
    },
    {
      id: 'ch04-q03',
      prompt:
        'A martingale residual for one individual is large and positive. What does this indicate?',
      options: [
        'The individual survived much longer than the model predicted.',
        'More events were observed for this individual than the model predicted, so the individual is poorly fitted.',
        'The residual is censored and carries no information.',
        'The hazard ratio for this individual is negative.',
      ],
      correctIndex: 1,
      explanation:
        'The martingale residual is observed minus expected number of events. A large positive value means the model under-predicts the event for that individual, suggesting a poor fit or an outlying covariate pattern.',
      source: '§4.1.3',
    },
    {
      id: 'ch04-q04',
      prompt:
        'A log-cumulative hazard plot shows four curves that are roughly parallel. What does this suggest?',
      options: [
        'The proportional hazards assumption is plausible for the grouping variable.',
        'The covariates are collinear.',
        'The hazard functions cross, so the log-rank test is invalid.',
        'The baseline hazard is constant over time.',
      ],
      correctIndex: 0,
      explanation:
        'Under PH, log H_i(t) - log H_0(t) = beta\'x_i is time-constant, so the log-cumulative hazard curves are parallel. Non-parallel or crossing curves raise doubts about PH.',
      source: '§4.4.1',
    },
    {
      id: 'ch04-q05',
      prompt:
        'The Grambsch-Therneau test for a covariate returns p = 0.01. How should this be interpreted?',
      options: [
        'There is strong evidence that the covariate has no effect.',
        'There is evidence that the hazard ratio for this covariate changes over time.',
        'The model fits well and PH is confirmed.',
        'The test is only valid when there is no censoring.',
      ],
      correctIndex: 1,
      explanation:
        'A small p-value is evidence against PH: the scaled Schoenfeld residuals suggest the coefficient varies with time. Investigate with plots and consider time-dependent effects or stratification.',
      source: '§4.4.2',
    },
    {
      id: 'ch04-q06',
      prompt:
        'Which combination of diagnostics does Collett recommend for routine assessment of a Cox model?',
      options: [
        'Only the cumulative hazard plot of Cox-Snell residuals.',
        'Only the Wald tests of the coefficients.',
        'Deviance residuals against the risk score, influence diagnostics, and scaled Schoenfeld residual plots/tests.',
        'A histogram of the observed survival times.',
      ],
      correctIndex: 2,
      explanation:
        'Section 4.5 recommends deviance-residual plots against the risk score, supplemented by influence diagnostics, with PH assessed using log-cumulative hazard plots, scaled Schoenfeld plots and the Grambsch-Therneau test.',
      source: '§4.5',
    },
  ],
}
