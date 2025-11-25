import type {BaseTypeResponse} from "@/api/incomeAndExpenditure/dto/response/BaseTypeResponse";
import {BaseListResponse} from "@/api/incomeAndExpenditure/dto/response/BaseListResponse";

export interface ExpenseTypeTreeResponse extends BaseTypeResponse { }

export interface ExpenseTypeDetailResponse extends BaseTypeResponse { }

export interface ExpenseRecordListResponse extends BaseListResponse { }
