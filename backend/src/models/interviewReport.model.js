const mongoose = require("mongoose");

/**
 * -job description :string
 * -resume text: string
 * -self description:string
 * -match score: number
 *
 * -technical question:
 *     [{
 * question: "",
 *     answer: ""
 *      intension:""
 *      }]
 *
 *
 * -behavioural question:[{
 *               question: "",
 *                answer: "",
 *                   intension:""
 *                 }]
 *
 *
 * -skill gap:[{
 *              skill: "",
 *             severity: "",
 *            type:string,
 * enum:["low","median","high"]}]
 *
 *
 * -prepration plan:[{day:Number,
 *                     focus:string,
 *                     task:string
 * }]
 */
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "technical question is required"],
    },
    answer: { type: String, required: [true, "answer is required"] },
    intension: { type: String, required: [true, "intension is required"] },
  },
  {
    _id: false,
  },
);

const behaviouralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "behavioural question is required"],
    },
    answer: { type: String, required: [true, "answer is required"] },
    intension: { type: String, required: [true, "intension is required"] },
  },
  {
    _id: false,
  },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: { type: String, required: [true, "skill is required"] },
    severity: { type: String, required: [true, "severity is required"] },
    type: {
      type: String,
      enum: ["low", "median", "high"],
      required: [true, "type is required"],
    },
  },
  {
    _id: false,
  },
);

const preprationPlanSchema = new mongoose.Schema(
  {
    day: { type: Number, required: [true, "day is required"] },
    focus: { type: String, required: [true, "focus is required"] },
    task: { type: String, required: [true, "task is required"] },
  },
  {
    _id: false,
  },
);

const interviewReportSchema = new mongoose.Schema(
  {
    jobDescription: {
      type: String,
      required: [true, "job description is required"],
    },
    resume: { type: String },

    selfDescription: { type: String },
    matchScore: { type: Number, min: 0, max: 100 },
    technicalQuestions: [technicalQuestionSchema],
    behaviouralQuestions: [behaviouralQuestionSchema],
    skillGaps: [skillGapSchema],
    preprationPlans: [preprationPlanSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);

const InterviewReport = mongoose.model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = InterviewReport;
