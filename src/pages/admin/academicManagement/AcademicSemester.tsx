import { Button, Space, Table, TableColumnsType } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";

interface IDataType {
    key: string;
    _id: string;
    name: string;
    year: string;
    startMonth: string;
    endMonth: string;
}

const AcademicSemester = () => {

    const { data: semesterData } = useGetAllSemestersQuery(undefined);
    // console.log(semesterData?.data);

    const tableData = semesterData?.data?.map(({ _id, name, year, startMonth, endMonth }) => ({
        key: _id, name, year, startMonth, endMonth
    }));



    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination: any, filters: any, sorter: any) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const columns: TableColumnsType<IDataType> = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            filters: [
                ...Array.from(
                    new Set(tableData?.map((data) => data.name))
                ).map((name) => ({ text: name, value: name })),
            ],
            filteredValue: filteredInfo.name || null,
            onFilter: (value, record) => record.name.includes(value as string),
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Year",
            dataIndex: "year",
            key: "year",
            sorter: (a, b) => a.year.localeCompare(b.year),
            sortOrder: sortedInfo.columnKey === "year" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Start Month",
            dataIndex: "startMonth",
            key: "startMonth",
            filters: [
                ...Array.from(
                    new Set(tableData?.map((data) => data.startMonth))
                ).map((month) => ({ text: month, value: month })),
            ],
            filteredValue: filteredInfo.startMonth || null,
            onFilter: (value, record) => record.startMonth === value,
            sorter: (a, b) => a.startMonth.localeCompare(b.startMonth),
            sortOrder: sortedInfo.columnKey === "startMonth" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "End Month",
            dataIndex: "endMonth",
            key: "endMonth",
            filters: [
                ...Array.from(
                    new Set(tableData?.map((data) => data.endMonth))
                ).map((month) => ({ text: month, value: month })),
            ],
            filteredValue: filteredInfo.endMonth || null,
            onFilter: (value, record) => record.endMonth === value,
            sorter: (a, b) => a.endMonth.localeCompare(b.endMonth),
            sortOrder: sortedInfo.columnKey === "endMonth" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => handleDelete(record.key)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];



    return (
        <div style={{ padding: "20px" }}>
            <Space style={{ marginBottom: 16 }}>
                <Button onClick={clearFilters}>Clear Filters</Button>
                <Button onClick={clearAll}>Clear All</Button>
            </Space>
            <Table
                columns={columns}
                dataSource={tableData}
                onChange={handleChange}
                bordered
                pagination={{ pageSize: 5 }}
            />
        </div>
    );
};

export default AcademicSemester;