import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const createJob = async (req, res) => {
  const { position, company } = req.body

  if (!position || !company) {
    throw new BadRequestError('Please fill up all fields')
  }

  req.body.createdBy = req.user.userId

  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId })

  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs: jobs.length,
    numOfPages: 1
  })
}

const updateJob = async (req, res) => {
  res.send('updateJob')
}

const deleteJob = async (req, res) => {
  res.send('deleteJob')
}

const showStats = async (req, res) => {
  res.send('showStats')
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }