import type {BaseTypeResponse} from "@/api/incomeAndExpenditure/dto/response/BaseTypeResponse";
import {BaseListResponse} from "@/api/incomeAndExpenditure/dto/response/BaseListResponse";
import {BaseDetailResponse} from "@/api/incomeAndExpenditure/dto/response/BaseDetailResponse";

export interface ExpenseTypeTreeResponse extends BaseTypeResponse { }

export interface ExpenseTypeDetailResponse extends BaseTypeResponse { }

export interface ExpenseRecordListResponse extends BaseListResponse { }

export interface ExpenseRecordDetailResponse extends BaseDetailResponse { }