import { prisma } from "../prisma.js";
export const getRecords = async (req, res) => {
    try {
        const data = await prisma.car.findMany();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(`DB Fejl: Kunne ikke hente liste af biler`);
    }
};
export const createRecord = async (req, res) => {
    console.log(req.body);
    res.send(`Funktion til at oprette en bil`);
};
