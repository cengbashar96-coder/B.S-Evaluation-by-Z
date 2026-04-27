import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const projects = await db.project.findMany({
      include: {
        buildingInfo: true,
        floorReports: true,
        structuralReport: true,
        foundations: true,
        columns: true,
        beams: true,
        electrical: true,
        plumbing: true,
        technicalNotes: true,
        engineers: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, buildingInfo, floorReports, structuralReport, foundations, columns, beams, electrical, plumbing, technicalNotes, engineers } = body;

    // Handle undefined and empty strings
    const cleanData = (data: any) => {
      if (data === undefined || data === '' || data === null) return null;
      if (typeof data === 'string' && data.trim() === '') return null;
      return data;
    };

    // Create or update project
    let project;
    
    if (id) {
      // Update existing project
      project = await db.project.update({
        where: { id },
        data: {
          name: name || 'مشروع جديد',
          updatedAt: new Date(),
        },
      });
    } else {
      // Create new project
      project = await db.project.create({
        data: {
          name: name || 'مشروع جديد',
        },
      });
    }

    // Handle buildingInfo
    if (buildingInfo && Object.keys(buildingInfo).length > 0) {
      await db.buildingInfo.upsert({
        where: { projectId: project.id },
        update: {
          propertyNumber: cleanData(buildingInfo.propertyNumber),
          previousLicense: cleanData(buildingInfo.previousLicense),
          licenseDate: cleanData(buildingInfo.licenseDate),
          area: cleanData(buildingInfo.area),
          ownerName: cleanData(buildingInfo.ownerName),
          buildingComponent: cleanData(buildingInfo.buildingComponent),
          floorCount: cleanData(buildingInfo.floorCount),
          buildingUsage: cleanData(buildingInfo.buildingUsage),
          locationImage: cleanData(buildingInfo.locationImage),
          locationDescription: cleanData(buildingInfo.locationDescription),
        },
        create: {
          projectId: project.id,
          propertyNumber: cleanData(buildingInfo.propertyNumber),
          previousLicense: cleanData(buildingInfo.previousLicense),
          licenseDate: cleanData(buildingInfo.licenseDate),
          area: cleanData(buildingInfo.area),
          ownerName: cleanData(buildingInfo.ownerName),
          buildingComponent: cleanData(buildingInfo.buildingComponent),
          floorCount: cleanData(buildingInfo.floorCount),
          buildingUsage: cleanData(buildingInfo.buildingUsage),
          locationImage: cleanData(buildingInfo.locationImage),
          locationDescription: cleanData(buildingInfo.locationDescription),
        },
      });
    }

    // Handle floorReports - delete all and recreate
    if (floorReports && floorReports.length > 0) {
      await db.floorReport.deleteMany({
        where: { projectId: project.id },
      });

      for (const floor of floorReports) {
        await db.floorReport.create({
          data: {
            projectId: project.id,
            floorNumber: floor.floorNumber,
            floorArea: cleanData(floor.floorArea),
            projectionArea: cleanData(floor.projectionArea),
            elevation: cleanData(floor.elevation),
            notes: cleanData(floor.notes),
            observations: cleanData(floor.observations),
          },
        });
      }
    }

    // Handle structuralReport
    if (structuralReport && Object.keys(structuralReport).length > 0) {
      await db.structuralReport.upsert({
        where: { projectId: project.id },
        update: {
          structuralSystem: cleanData(structuralReport.structuralSystem),
          schmidtReport: cleanData(structuralReport.schmidtReport),
          schmidtConcreteStrength: cleanData(structuralReport.schmidtConcreteStrength),
          soilMechanicsReport: cleanData(structuralReport.soilMechanicsReport),
          soilType: cleanData(structuralReport.soilType),
          foundationDepth: cleanData(structuralReport.foundationDepth),
          soilCapacity: cleanData(structuralReport.soilCapacity),
          soilFrictionAngle: cleanData(structuralReport.soilFrictionAngle),
          soilCohesion: cleanData(structuralReport.soilCohesion),
          groundwaterLevel: cleanData(structuralReport.groundwaterLevel),
          soilNotes: cleanData(structuralReport.soilNotes),
        },
        create: {
          projectId: project.id,
          structuralSystem: cleanData(structuralReport.structuralSystem),
          schmidtReport: cleanData(structuralReport.schmidtReport),
          schmidtConcreteStrength: cleanData(structuralReport.schmidtConcreteStrength),
          soilMechanicsReport: cleanData(structuralReport.soilMechanicsReport),
          soilType: cleanData(structuralReport.soilType),
          foundationDepth: cleanData(structuralReport.foundationDepth),
          soilCapacity: cleanData(structuralReport.soilCapacity),
          soilFrictionAngle: cleanData(structuralReport.soilFrictionAngle),
          soilCohesion: cleanData(structuralReport.soilCohesion),
          groundwaterLevel: cleanData(structuralReport.groundwaterLevel),
          soilNotes: cleanData(structuralReport.soilNotes),
        },
      });
    }

    // Handle foundations - delete all and recreate
    if (foundations && foundations.length > 0) {
      await db.foundation.deleteMany({
        where: { projectId: project.id },
      });

      for (const foundation of foundations) {
        await db.foundation.create({
          data: {
            projectId: project.id,
            hasBasement: cleanData(foundation.hasBasement) || false,
            basementDesc: cleanData(foundation.basementDesc),
            foundationType: cleanData(foundation.foundationType),
            foundationDepth: cleanData(foundation.foundationDepth),
            foundationModel: cleanData(foundation.foundationModel),
            length: cleanData(foundation.length),
            width: cleanData(foundation.width),
            height: cleanData(foundation.height),
            totalLoad: cleanData(foundation.totalLoad),
            actualStress: cleanData(foundation.actualStress),
            isVerified: cleanData(foundation.isVerified) || false,
          },
        });
      }
    }

    // Handle columns - delete all and recreate
    if (columns && columns.length > 0) {
      await db.columnWall.deleteMany({
        where: { projectId: project.id },
      });

      for (const column of columns) {
        await db.columnWall.create({
          data: {
            projectId: project.id,
            columnType: cleanData(column.columnType),
            floorNumber: cleanData(column.floorNumber),
            width: cleanData(column.width),
            depth: cleanData(column.depth),
            totalLoad: cleanData(column.totalLoad),
            actualStress: cleanData(column.actualStress),
            allowableStress: cleanData(column.allowableStress),
            isVerified: cleanData(column.isVerified) || false,
          },
        });
      }
    }

    // Handle beams - delete all and recreate
    if (beams && beams.length > 0) {
      await db.beamSlab.deleteMany({
        where: { projectId: project.id },
      });

      for (const beam of beams) {
        await db.beamSlab.create({
          data: {
            projectId: project.id,
            element: cleanData(beam.element),
            floorNumber: cleanData(beam.floorNumber),
            supportType: cleanData(beam.supportType),
            span: cleanData(beam.span),
            width: cleanData(beam.width),
            thickness: cleanData(beam.thickness),
            fy: cleanData(beam.fy),
            deadLoad: cleanData(beam.deadLoad),
            liveLoad: cleanData(beam.liveLoad),
            totalLoad: cleanData(beam.totalLoad),
            appliedMoment: cleanData(beam.appliedMoment),
            allowableMoment: cleanData(beam.allowableMoment),
            isVerified: cleanData(beam.isVerified) || false,
          },
        });
      }
    }

    // Handle electrical
    if (electrical && Object.keys(electrical).length > 0) {
      const imagesArray = electrical.images ? JSON.stringify(electrical.images) : null;
      await db.electricalReport.upsert({
        where: { projectId: project.id },
        update: {
          installation: cleanData(electrical.installation),
          electricalNotes: cleanData(electrical.electricalNotes),
          images: imagesArray,
        },
        create: {
          projectId: project.id,
          installation: cleanData(electrical.installation),
          electricalNotes: cleanData(electrical.electricalNotes),
          images: imagesArray,
        },
      });
    }

    // Handle plumbing
    if (plumbing && Object.keys(plumbing).length > 0) {
      const imagesArray = plumbing.images ? JSON.stringify(plumbing.images) : null;
      await db.plumbingReport.upsert({
        where: { projectId: project.id },
        update: {
          freshWaterNotes: cleanData(plumbing.freshWaterNotes),
          wastewaterNotes: cleanData(plumbing.wastewaterNotes),
          images: imagesArray,
        },
        create: {
          projectId: project.id,
          freshWaterNotes: cleanData(plumbing.freshWaterNotes),
          wastewaterNotes: cleanData(plumbing.wastewaterNotes),
          images: imagesArray,
        },
      });
    }

    // Handle technicalNotes
    if (technicalNotes && Object.keys(technicalNotes).length > 0) {
      await db.technicalNotes.upsert({
        where: { projectId: project.id },
        update: {
          architecturalNotes: cleanData(technicalNotes.architecturalNotes),
          structuralNotes: cleanData(technicalNotes.structuralNotes),
          electricalNotes: cleanData(technicalNotes.electricalNotes),
          plumbingNotes: cleanData(technicalNotes.plumbingNotes),
          requirements: cleanData(technicalNotes.requirements),
          suggestions: cleanData(technicalNotes.suggestions),
        },
        create: {
          projectId: project.id,
          architecturalNotes: cleanData(technicalNotes.architecturalNotes),
          structuralNotes: cleanData(technicalNotes.structuralNotes),
          electricalNotes: cleanData(technicalNotes.electricalNotes),
          plumbingNotes: cleanData(technicalNotes.plumbingNotes),
          requirements: cleanData(technicalNotes.requirements),
          suggestions: cleanData(technicalNotes.suggestions),
        },
      });
    }

    // Handle engineers - delete all and recreate
    if (engineers && engineers.length > 0) {
      await db.engineer.deleteMany({
        where: { projectId: project.id },
      });

      for (const engineer of engineers) {
        await db.engineer.create({
          data: {
            projectId: project.id,
            sequence: engineer.sequence,
            specialty: cleanData(engineer.specialty),
            name: cleanData(engineer.name),
            unionNumber: cleanData(engineer.unionNumber),
            signature: cleanData(engineer.signature),
          },
        });
      }
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error saving project:', error);
    return NextResponse.json(
      { error: 'Failed to save project', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
