import User from '../model/user.js'
export const registration =async (req, res) => {
    try {
      // Extract username, email, and password from the request body
      const { username, email, password,role} = req.body;
      console.log(req.body)
      
      // Create a new user instance
      const newUser = new User({ username, email, password,role});
  
      // Save the user to the database
      const savedUser = await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  export const getUser = async(req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }catch(e){
        console.log(e)
    }

  }

  export const deleteUser = async (req, res) => {
    try {
      // Delete the user by their userId
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  