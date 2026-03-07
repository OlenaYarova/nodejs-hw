import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    requirefd: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
}
);

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email;
  }
}
);

export const User = model('User', userSchema);
