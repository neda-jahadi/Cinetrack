import { prisma } from '../configs/prisma.js';

export const getAllMunicipalities = async (reg, res) => {
  try {
    const municipalities = await prisma.municipality.findMany({
      include: {
        region: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    return res.status(200).json({
      success: true,
      data: municipalities,
      message: 'Got all municipalities successfully',
    });
  } catch (error) {
    console.error('Failed to get municipalities:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to get municipalities',
    });
  }
};

export const getAllRegions = async (reg, res) => {
  try {
    const regions = await prisma.region.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return res.status(200).json({
      success: true,
      data: regions,
      message: 'Got all regions successfully',
    });
  } catch (error) {
    console.error('Failed to get regions:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to get regions',
    });
  }
};
