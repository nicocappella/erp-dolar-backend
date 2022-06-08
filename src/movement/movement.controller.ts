import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateMovementDto,
  CreateMovementsDto,
} from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/uprate-balance.dto';
import { MovementService } from './movement.service';

@Controller('movement')
export class MovementController {
  constructor(private movementService: MovementService) {}

  @Get()
  async findMovements() {
    return this.movementService.findAll();
  }

  @Post()
  async createMovements(@Body() createMovementDto: CreateMovementsDto) {
    return this.movementService.createMany(createMovementDto.movements);
  }

  @Patch(':id')
  async updateMovement(
    @Param('id') id: string,
    @Body() updateMovementDto: UpdateMovementDto,
  ) {
    return this.movementService.updateOne(id, updateMovementDto);
  }

  @Delete(':id')
  async deleteMovement(@Param('id') id: string) {
    return this.movementService.deleteOne(id);
  }
}
