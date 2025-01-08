"use server";
import { revalidatePath } from "next/cache";
import connectDB from "../config";
import Person from "../models/userModel";

export const handleForm = async (data, pathToRevalidate) => {
  try {
    await connectDB();
    const { name, email } = data;
    if (!name || !email) {
      return {
        success: false,
        message: "All the fields are required!",
      };
    }
    const createdPerson = await Person.create({
      name,
      email,
    });
    if (createdPerson) {
        revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User Added Successfully.",
      };
    } else {
      return {
        success: false,
        message: "Something Went Wrong!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something Went Wrong!",
    };
  }
};

export const fetchUsers = async () => {
  try {
    await connectDB();
    const allUsers = await Person.find({}).sort({ createdAt: -1 });

    if (allUsers) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(allUsers)),
      };
    } else {
      return {
        success: false,
        message: "Something Went Wrong!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something Went Wrong!",
    };
  }
};

export const editUsers = async (userId,data,pathToRevalidate) => {
  try {
    await connectDB();

    const {name, email} = data;
    const editedUser = await Person.findByIdAndUpdate({
      _id: userId
    },{
      name,
      email,
    },{new: true});

    if(editedUser) {
      revalidatePath(pathToRevalidate);
      return {
        success: true,
        message: "User Updated Successfully.",
      }
    } else {
      return {
        success: false,
        message: "Something went wrong! Please try again.",
      }
    }
    
    
  } catch (error) {
    console.log(error);
    return { 
      success: false,
      message: 'Something Went Wrong! Please try again.',
    }
  }
}

export const deleteUser = async (userId,pathToRevalidate) => {
    try {
        await connectDB();

        const deletedUser = await Person.findByIdAndDelete(userId);
        if(deleteUser) {
            revalidatePath(pathToRevalidate);
            return {
                success: true,
                message: 'User Deleted Successfylly.',
            }
        }else {
            return {
                success: false,
                message: 'Something went wrong! Please try again.',
            }
        }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: "Something went wrong!",
        }
    }
}