import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  field_of_study: {
    type: String,
    required: true,
  },
  Scientific_interests: [
    {
      language: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
    },
  ],
  experience: {
    type: String,
    required: true,
  },
  why_join: {
    type: String,
    required: true,
  },
  grade_level: {
    type: String,
    required: true,
  },
  DepartementsDesires: [
    {
      depName: {
        type: String,
        required: true,
      },
      depValue: {
        type: String,
        required: true,
      },
    },
  ],
});

const Registration = mongoose.model("Registration", RegistrationSchema);

export default Registration;
