import type { Chapter } from '../types'

/**
 * Chapter 17 - Survival analysis with R (Collett, 4th ed.).
 * The R functions used throughout the book, chapter by chapter, and the
 * packages that provide them.
 */
export const chapter17: Chapter = {
  number: 17,
  slug: 'r-implementation',
  title: 'Survival analysis with R',
  summary:
    'How to implement every method in the book in R: data frames and the Surv object, the survival package, flexsurv, eha, icenReg, parfm, cmprsk and the tools for counting process data.',
  bookSections: '§17.1-17.15',
  flashcards: [
    {
      id: 'ch17-f01',
      front: 'What is a data frame in R, and how are variables from it referred to?',
      back: 'A data frame is a rectangular array with columns corresponding to variables and rows to observations, created with data.frame(). A variable inside a specific data frame is referred to by linking the two names with a dollar symbol, as in bcancer followed by the variable name.',
      source: '§17.2',
    },
    {
      id: 'ch17-f02',
      front: 'What is the role of the Surv object in a model formula?',
      back: 'Surv() describes the response variable: Surv(time, status) for right-censored data, where status is 1 for an event and 0 for a censored time. It is linked to a model formula with the tilde symbol, for example Surv(time, status) ~ stain, and a formula of ~ 1 means a single sample with no covariates.',
      source: '§17.3',
    },
    {
      id: 'ch17-f03',
      front: 'Which functions produce Kaplan-Meier estimates and the log-rank and Peto-Peto tests?',
      back: 'survfit() in the survival package gives the Kaplan-Meier estimate of the survivor function, and summary() on that object gives the numerical summary including standard errors and confidence intervals. survdiff() performs the comparison tests using the weights S_KM(t)^rho: the log-rank test is rho = 0 (the default) and the Peto-Peto test is rho = 1.',
      source: '§17.3',
    },
    {
      id: 'ch17-f04',
      front: 'How is the Cox model fitted in R, and what is the default for tied event times?',
      back: 'coxph() in the survival package, used as coxph(Surv(time, status) ~ x1 + x2, data = mydata). It defaults to Efron\'s method for ties, whereas many other packages use Breslow\'s method; adding the option ties="breslow" reproduces the book\'s results. Stratification is specified with a strata() term in the formula.',
      source: '§17.4',
    },
    {
      id: 'ch17-f05',
      front: 'How do you obtain residuals from a fitted Cox model in R?',
      back: 'With residuals() applied to the coxph object, using type="martingale", type="deviance", type="score", type="schoenfeld" or type="scaledsch". Cox-Snell residuals are obtained from the martingale residuals as status minus the martingale residual.',
      source: '§17.5.1',
    },
    {
      id: 'ch17-f06',
      front: 'Which R function performs the Grambsch-Therneau test of proportional hazards?',
      back: 'cox.zph() applied to a coxph object gives chi-squared statistics and p-values for the individual tests of each covariate, together with an overall test of the proportional hazards assumption.',
      source: '§17.5',
    },
    {
      id: 'ch17-f07',
      front: 'Which function fits parametric survival models in R, and which distributions are available?',
      back: 'survreg() in the survival package fits accelerated failure time models using the log-linear representation log T = mu + alpha x + sigma * epsilon. The dist= option selects the distribution, including exponential, weibull, lognormal and loglogistic. The fitted object contains the linear predictors and the scale parameter, from which standardised residuals can be computed.',
      source: '§17.6',
    },
    {
      id: 'ch17-f08',
      front: 'How are flexible parametric models fitted in R?',
      back: 'Piecewise exponential models are fitted with phreg() in the eha package. Spline-based models, including the Royston-Parmar model, are fitted with flexsurvspline() in the flexsurv package, where the option k= sets the number of internal knots and models with different k are compared using AIC. Adding scale="odds" fits the flexible proportional odds model and gives log-odds ratios instead of log-hazard ratios.',
      source: '§17.7',
    },
    {
      id: 'ch17-f09',
      front: 'How are time-dependent variables prepared in R?',
      back: 'The data must be expressed in counting process format with the (start, stop, status) trio of variables, and the function tmerge() in the survival package builds such a data set by merging time-dependent variable definitions into a base data set. survSplit() is used to split the time scale at specified cut points, which is convenient for piecewise Cox models.',
      source: '§17.9',
    },
    {
      id: 'ch17-f10',
      front: 'How is a survival object specified for interval-censored data, and which package fits models to it?',
      back: 'Use Surv(L, R, type="interval2"), where L and R are the lower and upper limits of the interval; an infinite upper limit may be given as Inf or NA. The icenReg package provides ic_np() for the non-parametric estimate and ic_sp() for semi-parametric models for interval-censored data.',
      source: '§17.10',
    },
    {
      id: 'ch17-f11',
      front: 'Which R function fits parametric frailty models, and how are the options specified?',
      back: 'parfm() in the parfm package, with dist= giving the baseline distribution (for example "weibull"), frailty= giving the frailty distribution (for example "gamma" or "lognormal"), and cluster= naming the variable that identifies the individual or the group that shares the frailty. Note that parfm parameterises the frailty variance differently from the book.',
      source: '§17.11',
    },
    {
      id: 'ch17-f12',
      front: 'How are competing risks quantities obtained in R?',
      back: 'cuminc() in the cmprsk package estimates the cause-specific cumulative incidence functions from the event time and the cause-of-failure variable, and the estimates can be plotted directly. crr() in the same package fits the Fine and Gray model for the cumulative incidence, where cov1 specifies the covariate matrix, cencode identifies the censoring code and failcode selects the cause being modelled.',
      source: '§17.12',
    },
    {
      id: 'ch17-f13',
      front: 'How are recurrent events and event history models fitted in R?',
      back: 'Recurrent event data are put into counting process format with tmerge() and survSplit(); the option cumtdc= in tmerge() enumerates the number of recurrent events, which is needed to stratify by recurrence number when fitting the PWP model with coxph(). Event history (multistate) models are fitted by defining a variable for the transition and building the data with tmerge().',
      source: '§17.13',
    },
    {
      id: 'ch17-f14',
      front: 'How is a Cox model with dependent censoring fitted in R?',
      back: 'Fit a parametric survival model (usually survreg() with a Weibull distribution) to the time to censoring, reversing the event indicator so that censored times are the events, then derive the inverse probability of censoring weights from the fitted survivor function. The weighted analysis uses the counting process format with the weights included in the model.',
      source: '§17.14',
    },
    {
      id: 'ch17-f15',
      front: 'Which R features support Bayesian survival analysis?',
      back: 'Bayesian models are fitted by writing the likelihood and prior explicitly and simulating from the posterior with MCMC, for which general-purpose software such as the R packages that interface to Stan is used. A Cox model can be fitted in the Bayesian framework by using the partial likelihood in place of the full likelihood, and a piecewise exponential baseline hazard allows prior information about the baseline hazard to be included.',
      source: '§17.15',
    },
  ],
  questions: [
    {
      id: 'ch17-q01',
      prompt:
        'A Cox model is fitted in R with coxph() and the results do not match the numbers in the book. What is the most likely explanation?',
      options: [
        'The survival object was constructed incorrectly.',
        'coxph() uses Efron\'s method for tied event times by default, whereas the book uses Breslow\'s method.',
        'The model must be fitted with survdiff() instead.',
        'The data must first be converted to counting process format.',
      ],
      correctIndex: 1,
      explanation:
        'coxph() defaults to Efron\'s approximation for ties while many other packages use Breslow\'s. Adding the option ties="breslow" reproduces the book\'s output.',
      source: '§17.4',
    },
    {
      id: 'ch17-q02',
      prompt:
        'With survdiff(), which value of the rho option gives the log-rank test and which gives the Peto-Peto test?',
      options: [
        'rho = 0 gives Peto-Peto and rho = 1 gives log-rank.',
        'rho = 0 gives log-rank and rho = 1 gives Peto-Peto.',
        'rho = 1 gives both tests simultaneously.',
        'rho has no effect on the test performed.',
      ],
      correctIndex: 1,
      explanation:
        'The test statistic weights each observed-minus-expected difference by S_KM(t)^rho. The default rho = 0 is the log-rank test, and rho = 1 gives the Peto-Peto test; the Wilcoxon test is not implemented in survival, but Peto-Peto is a close substitute.',
      source: '§17.3',
    },
    {
      id: 'ch17-q03',
      prompt: 'What does the function survreg() in the survival package fit?',
      options: [
        'A Cox proportional hazards model.',
        'An accelerated failure time model using the log-linear representation, with the distribution chosen by the dist= option.',
        'A non-parametric estimate of the survivor function.',
        'The Fine and Gray model for competing risks.',
      ],
      correctIndex: 1,
      explanation:
        'survreg() fits parametric accelerated failure time models, with dist= selecting exponential, Weibull, lognormal, loglogistic and other distributions. Cox models are fitted with coxph().',
      source: '§17.6',
    },
    {
      id: 'ch17-q04',
      prompt: 'Which function and package fit the Fine and Gray model for the cumulative incidence?',
      options: [
        'cuminc() in cmprsk.',
        'crr() in cmprsk, with failcode selecting the cause being modelled and cencode identifying the censoring code.',
        'coxph() in survival with a strata() term.',
        'parfm() in parfm.',
      ],
      correctIndex: 1,
      explanation:
        'cuminc() estimates the cumulative incidence functions, while crr() fits the Fine and Gray regression model for a chosen cause. The covariates must be supplied as a matrix via cov1 and the censoring code set with cencode.',
      source: '§17.12',
    },
    {
      id: 'ch17-q05',
      prompt: 'How would you specify an interval-censored response in R?',
      options: [
        'Surv(time, status) with status equal to 2 for interval-censored observations.',
        'Surv(L, R, type="interval2"), where L and R are the lower and upper limits of the interval.',
        'Surv(time, time2, event) with the two time variables reversed.',
        'A factor with one level per visit interval.',
      ],
      correctIndex: 1,
      explanation:
        'The interval2 type takes the lower and upper limits of the observed interval, and an infinite upper limit can be given as Inf or NA. The icenReg package then provides ic_np() for the non-parametric estimate and ic_sp() for semi-parametric modelling.',
      source: '§17.10',
    },
    {
      id: 'ch17-q06',
      prompt: 'What is the purpose of the tmerge() function, and which option helps fit a PWP model?',
      options: [
        'It merges two data frames of the same structure, and its id= option identifies the strata.',
        'It builds a data set in counting process format by adding time-dependent variables to a base data set, and its cumtdc= option enumerates the number of recurrent events so the data can be stratified by recurrence number.',
        'It computes the cumulative hazard for a fitted model.',
        'It splits the time scale at fixed cut points for piecewise models.',
      ],
      correctIndex: 1,
      explanation:
        'tmerge() assembles the (start, stop, status) format needed for time-dependent variables, recurrent events and multistate models. The cumtdc= option counts the recurrent events, giving the recurrence number used to stratify when fitting the PWP model with coxph().',
      source: '§17.13',
    },
  ],
}
