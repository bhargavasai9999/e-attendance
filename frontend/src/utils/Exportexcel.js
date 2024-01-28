import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const Exportexcel = (data, fileName) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  try {
    if(data){
    const dataArray = Object.keys(data).map(key => {
        const { studentid, created_at,attendance_id, ...rest } = data[key];
        return rest;
      });    
      console.log(dataArray)
    const ws = XLSX.utils.json_to_sheet(dataArray);

    const wb = { Sheets: { 'Report': ws }, SheetNames: ['Report'] };

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const excelBlob = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(excelBlob, fileName + fileExtension);
    return {message:"Exported successfully"}
    }

  else{
    return {message:"No data found to export"}
  }
  } catch (error) {
    console.error('Error in Exportexcel:', error);
  }
};
