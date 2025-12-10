import { DataTable } from "@/components/data-table-admin-puskesmas";
import data from "../data.json";
import React from "react";

export default function DataPasien(){
    return(
    <>
      <DataTable data={data} />
    </>
    )
    
}