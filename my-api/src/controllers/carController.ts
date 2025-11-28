import { Request, Response } from "express";
import { prisma } from "../prisma.js";

export const getRecords = async (req: Request, res: Response) => {
    try {
        const data = await prisma.car.findMany({
            // Vælger bestemte ting fra API'et
            select: {
                brand: true,
                model: true,
                year: true,
                price:true
            },
            // Sortere efter pris (mindt til højest)
            orderBy: {
                price: 'asc'
            }
        })
        res.json(data)
    } catch (error) {
        console.error(error);
        res.status(500).send(`Fejl i DB: Kunne ikke hente listen biler`)
    }
}

export const getRecord = async (req: Request, res: Response) => {
    const id = Number(req.params.id)

    if(!id) {
        return res.status(400).json({ error: 'Id har ingen værdi' })
    }

    try {
        const data = await prisma.car.findUnique({
            where: {
                id
            }
        })
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to fetch car' })
    }
}

export const createRecord = async (req: Request, res: Response) => {
    const { category, brand, model, year, price, fueltype } = req.body;

    if (!category || !brand || !model || !year || !price || !fueltype) {
        return res.status(500).json({ error: 'Du skal udfylde ALLE felter, før du kan oprette en bil' });
    }

    try {
        const data = await prisma.car.create({
            data: {
                category,
                brand,
                model,
                year: Number(year),
                price,
                fueltype
            }
        })
        return res.status(201).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Der gik noget galt, prøv igen senere' })
    }
}