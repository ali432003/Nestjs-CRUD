import { CreateEmployeeDto } from "./employee-create.dto"
import { PartialType } from "@nestjs/mapped-types"

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) { }