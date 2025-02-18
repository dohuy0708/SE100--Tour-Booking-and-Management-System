import mongooser from "mongoose";

const TourProgramSchema = new mongooser.Schema({
    tour_id:{type: mongooser.Schema.Types.ObjectId, ref: 'Tour', required: true},
    day_number:{type: Number, required: true},
    program_description:{type: String, required: true},
    image : {type: String, required: false},
});



export const TourProgramModel = mongooser.model('TourProgram', TourProgramSchema);

export const createProgram=(values: Record<string, any>, session?:mongooser.ClientSession)=> {
    const program=new TourProgramModel(values);
    return program.save({session}).then((program)=>program.toObject());
}

export const updateProgramById=(program_id:string, values: Record<string, any>)=> TourProgramModel.findByIdAndUpdate(program_id, values);

export const deleteProgramById=(program_id:string)=>TourProgramModel.findByIdAndDelete({_id: program_id});

export const getPrograms=()=>TourProgramModel.find();

export const getProgramById=(program_id:string)=>TourProgramModel.findById(program_id);
export const getProgramsByTourId = (tour_id: string) =>TourProgramModel.find({ tour_id });

export const deleteProgramByTourId = (tour_id: string, options: { session?: any } = {}) => {
    return TourProgramModel.deleteMany({ tour_id }, options);
};

export const updateProgramByTourId = async (tour_id: string, values: Record<string, any>, session?: mongooser.ClientSession) => {
    return await TourProgramModel.updateMany({ tour_id }, values, { session });
  };

  