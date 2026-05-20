import { prisma } from "../configs/prisma.js";

export const getAllMunicipalities = async (reg, res) => {
    try {
        const municipalities = await prisma.municipality.findMany({
            include: {
                region: true
            },
            orderBy: {
                name: "asc"
            }
        })

        return res.status(200).json({ success: true, data: municipalities, message: "Got all municipalities successfully"})
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get municipalities",
        });
    }
}