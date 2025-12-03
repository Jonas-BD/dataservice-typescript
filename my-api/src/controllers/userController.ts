import { Request, Response } from 'express';
import { prisma } from '../prisma.js';
import bcrypt from 'bcrypt';

export const getRecords = async (req: Request, res: Response) => {
  try {
    const data = await prisma.user.findMany()
    return res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export const getRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if(!id) {
      return res.status(400).json({ error: 'Id har ingen værdi' })
  }

  try {
    const data = await prisma.user.findUnique({
      where: { id }
    })
    return res.status(200).json(data)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failing to fetch user'})
  }
}

export const createRecord = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password, role, isActive } = req.body

  if (!firstname || !lastname || !email || !password || !role || !isActive) {
    return res.status(400).json({ error: 'Alt skal udfyldes' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const data = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role,
        isActive: Boolean(isActive)
      }
    })
    return res.status(201).json(data)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Der gik noget galt' })
  }
}

export const updateRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Id har inge værdi' })
  }

  const { firstname, lastname, email, role, isActive } = req.body

  if (!firstname || !lastname || !email || !role || !isActive) {
    return res.status(400).json({ error: 'Alt skal udfyldes' })
  }

  try {
    const data = await prisma.user.update({
      where: { id },
      data: {
        firstname,
        lastname,
        email,
        role,
        isActive: Boolean(isActive)
      }
    })
    return res.status(200).json(data)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Der gik noget galt' })
  }
}

export const deleteRecord = async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({ error: 'Mangler id'})
  }

  try {
    const data = await prisma.user.delete({
      where: { id }
    })
    res.status(200).json({
      message: 'Bruger slettet',
      deleteId: id
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Der gik noget galt' })
  }
}