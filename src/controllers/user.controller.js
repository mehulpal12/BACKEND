import { asyncHandler } from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {User} from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import ApiResponse from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, userName, email, password } = req.body;
  console.log({ fullName, userName, email, password });
  if (
    [    fullName, userName, email, password].some((field) => field?.trim() === '')
  ){
    throw new ApiError(400,'All fields are required');
  }

  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existingUser) {
    throw new ApiError(409, 'User with this email or username already exists');
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  console.log({ avatarLocalPath });
  const coverImgLocalPath = req.files?.coverImg[0]?.path;
  if (!avatarLocalPath ) {
    throw new ApiError(400, 'Avatar and  are required');
  }

  const avatarUploadResult = await uploadOnCloudinary( avatarLocalPath);
  const coverImgUploadResult = coverImgLocalPath
    ? await uploadOnCloudinary(coverImgLocalPath)
    : null;
    if (!avatarUploadResult) {
      throw new ApiError(500, 'Failed to upload avatar');
    }

     const user = await User.create({
      fullName,
      userName: userName.toLowerCase(),
      email,
      password,
      avatar: avatarUploadResult.secure_url,
      coverImg: coverImgUploadResult?.secure_url || '',
    });
    const createdUser = await User.findById(user._id).select("-password -refreshToken ");
    if (!createdUser) {
      throw new ApiError(500, 'User creation failed');
    }
    return res.status(201).json(new ApiResponse(201, createdUser, 'User registered successfully'));
});

export { registerUser };