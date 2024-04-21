import { Card, Typography } from "@material-tailwind/react";


function DynamicTable({ TABLE_HEAD, TABLE_ROWS }) {

    if(TABLE_ROWS?.length > 0) {
        TABLE_HEAD = Object.keys(TABLE_ROWS[0])
    }

    return (
        <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD?.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {TABLE_ROWS?.map((field, index) => (
                        <tr key={field[0]} className="even:bg-blue-gray-50/50">
                            {
                                // field?.map((ele, idx) => (
                                //     <td key={ele} className="p-4">
                                //         <Typography variant="small" color="blue-gray" className="font-normal">
                                //             {ele}
                                //         </Typography>
                                //     </td>
                                // ))
                                Object.keys(field).map((key) => (
                                    <td key={key} className="p-4">
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {field[key]}
                                        </Typography>
                                    </td>
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
    );
}

export default DynamicTable;