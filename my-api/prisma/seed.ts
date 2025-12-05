import { prisma } from "../src/prisma"
import bcrypt from "bcrypt"

const main = async () => {
    await prisma.user.deleteMany()

    const user = await prisma.user.create({
        data: {
            firstname: 'Test',
            lastname: 'Bruger',
            email: 'test@bruger.dk',
            password: await bcrypt.hash('password', 10),
            role: 'USER',
            isActive: true
        }
    })
    console.log("Seed completed for user: ", user);
    
    const fuelTypes = await prisma.fueltypes.createMany({
        data: [
            { name: 'Benzin' },
            { name: 'Diesel' },
            { name: 'Hybrid' },
            { name: 'El' }
        ],
        skipDuplicates: true
    })
    console.log("Seed completed for fuel types", fuelTypes);
    
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e)
        prisma.$disconnect()
        process.exit(1)
    })