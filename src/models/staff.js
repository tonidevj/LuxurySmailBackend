import mongoose from 'mongoose'; 

// modelado para los admin o doctores
const staffSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  numberId: { 
    type: String, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  numberPhone: { 
    type: String, 
    required: true, 
    unique: true 
  },
  birthday: { 
    type: Date, 
    required: true 
  },
  sex: { 
    type: String, 
    required: true, 
    enum: ["hombre", "mujer"] 
  },
  specialty: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  passwordHash: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['doctor', 'admin'], 
    default: 'doctor' 
  },
  verified: {
    type: Boolean,
    default: false
  }});

staffSchema.set('toJSON', {
  transform: (document, returnObject) =>{
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
    delete returnObject.passwordHash;
  }
});

const Staff = mongoose.model('Staff', staffSchema);

export default Staff;