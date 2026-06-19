const validateLift = (body)=>{

    if(!body.liftNumber){

        return "Lift number required";

    }

    if(!body.servingFloors){

        return "Serving floors required";

    }

    return null;

};

module.exports=validateLift;