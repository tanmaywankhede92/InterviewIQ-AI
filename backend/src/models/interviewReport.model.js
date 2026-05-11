// const mongoose = require("mongoose");

// /**
//  * -job description :string
//  * -resume text: string
//  * -self description:string
//  * -match score: number
//  *
//  * -technical question:
//  *     [{
//  * question: "",
//  *     answer: ""
//  *      intention:""
//  *      }]
//  *
//  *
//  * -behavioural question:[{
//  *               question: "",
//  *                answer: "",
//  *                   intention:""
//  *                 }]
//  *
//  *
//  * -skill gap:[{
//  *              skill: "",
//  *             severity: "",
//  *            type:string,
//  * enum:["low","median","high"]}]
//  *
//  *
//  * -prepration plan:[{day:Number,
//  *                     focus:string,
//  *                     task:string
//  * }]
//  */
// const technicalQuestionSchema = new mongoose.Schema(
//   {
//     question: {
//       type: String,
//       required: [true, "technical question is required"],
//     },
//     answer: { type: String, required: [true, "answer is required"] },
//     intention: { type: String, required: [true, "intention is required"] },
//   },
//   {
//     _id: false,
//   },
// );

// const behavioralQuestionsSchema = new mongoose.Schema(
//   {
//     question: {
//       type: String,
//       required: [true, "behavioural question is required"],
//     },
//     answer: { type: String, required: [true, "answer is required"] },
//     intention: { type: String, required: [true, "intention is required"] },
//   },
//   {
//     _id: false,
//   },
// );

// const skillGapSchema = new mongoose.Schema(
//   {
//     skill: { type: String, required: [true, "skill is required"] },
//     severity: { type: String, required: [true, "severity is required"] },
//     type: {
//       type: String,
//       enum: ["low", "median", "high"],
//       required: [true, "type is required"],
//     },
//   },
//   {
//     _id: false,
//   },
// );

// const preparationPlanSchema = new mongoose.Schema(
//   {
//     day: { type: Number, required: [true, "day is required"] },
//     focus: { type: String, required: [true, "focus is required"] },
//     task: { type: String, required: [true, "task is required"] },
//   },
//   {
//     _id: false,
//   },
// );

// const interviewReportSchema = new mongoose.Schema(
//   {
//     jobDescription: {
//       type: String,
//       required: [true, "job description is required"],
//     },
//     resume: { type: String },

//     selfDescription: { type: String },
//     matchScore: { type: Number, min: 0, max: 100 },
//     technicalQuestions: [technicalQuestionSchema],
//     behavioralQuestions: [behavioralQuestionsSchema],
//     skillGaps: [skillGapSchema],
//     preparationPlan: [preparationPlanSchema],
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// const InterviewReport = mongoose.model(
//   "InterviewReport",
//   interviewReportSchema,
// );

// module.exports = InterviewReport;

const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },
    intention: {
      type: String,
      required: [true, "Intention is required"],
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required"],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  {
    _id: false,
  },
);

const preparationPlanSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "Day is required"],
  },
  focus: {
    type: String,
    required: [true, "Focus is required"],
  },
  tasks: [
    {
      type: String,
      required: [true, "Task is required"],
    },
  ],
});

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
    },
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;
