import { Schema, mongoose } from 'mongoose';

const companySchema = new Schema(
    {
        name: {
            type: String, required: true, trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        contactEmail: {
            type: String,
            required: true,
            trim: true
        },
        contactPhone: {
            type: String,
            required: true,
            trim: true
        },
    },
    { _id: false }
)

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },
        type: {
            type: String,
            enum: ["Full-Time", "Part-Time", "Contract", "Internship"],
            required: true,
        },
        description: {
            type: String,
            required: true,
            minlength: 20,
        },

        salary: {
            type: String,
            required: true,
        },

        location: {
            type: String,
            required: true,
            trim: true,
        },
         company: {
            type: companySchema,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model('Job', jobSchema);
export default Job;