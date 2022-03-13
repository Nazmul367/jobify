import { StatusCodes } from 'http-status-codes'
import { BadRequestError } from '../errors/index.js'

import User from "../models/User.js"

const register = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    throw new BadRequestError('Please fill all fields')
  }

  const userAlreadyExists = await User.findOne({ email })

  if (userAlreadyExists) {
    throw new BadRequestError('Email already exist')
  }

  const user = await User.create({ name, email, password })

  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { email: user.email, lastName: user.lastName, location: user.location, name: user.name }, token, Location: user.location })
}

const login = async (req, res) => {
  res.send('login')
}

const updateUser = async (req, res) => {
  res.send('update')
}

export { register, login, updateUser }