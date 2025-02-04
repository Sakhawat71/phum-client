import { useState } from "react";
import { Card, Typography, Button, Space, Row, Col, Tag, Select, message } from "antd";
import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourse.api";
import { IOfferedCourse } from "../../types/courseManagement.type";
import { IOfferedCourseForStudents } from "../../types/student.type";

const { Title, Text } = Typography;

const OfferedCourse = () => {
    const { data: offeredcourses, isLoading } = useGetAllOfferedCoursesQuery(undefined);
    const [selectedSections, setSelectedSections] = useState<Record<string, string>>({});

    // console.log(offeredcourses?.data);

    
    const groupedCourses = offeredcourses?.data?.reduce((acc, item : IOfferedCourseForStudents) => {
        const key = item.course.title;
        acc[key] = acc[key] || { course: item.course, sections: [] };

        acc[key].sections.push({
            section: item.section,
            _id: item._id,
            maxCapacity: item.maxCapacity,
            faculty: item.faculty,
            days: item.days,
            startTime: item.startTime,
            endTime: item.endTime,
        });

        return acc;
    }, {} as Record<string, { course: IOfferedCourse["course"]; sections: any[] }>);

    const handleSectionChange = (courseId: string, sectionId: string) => {
        setSelectedSections((prev) => ({ ...prev, [courseId]: sectionId }));
    };

    const handleEnroll = (courseId: string) => {
        if (!selectedSections[courseId]) {
            message.warning("Please select a section before enrolling.");
            return;
        }

        message.success(`Enrolled in Section ${selectedSections[courseId]} of ${courseId}`);
        // Perform enroll action here (API call)
    };

    if (isLoading) return <div>Loading courses...</div>;

    return (
        <div style={{ padding: "20px" }}>
            <Title level={2} style={{ textAlign: "center" }}>Offered Courses</Title>
            <Row gutter={[16, 16]}>
                {Object.values(groupedCourses || {}).map(({ course, sections }) => (
                    <Col xs={24} sm={24} md={12} lg={8} key={course._id}>
                        <Card title={`${course.prefix}-${course.code} ${course.title}`} bordered hoverable>
                            <Text strong>Sections:</Text>
                            <Select
                                placeholder="Select a section"
                                style={{ width: "100%", marginTop: 8 }}
                                onChange={(value) => handleSectionChange(course._id, value)}
                            >
                                {sections.map((section) => (
                                    <Select.Option key={section._id} value={section.section}>
                                        Section {section.section} - {section.days.join(", ")} ({section.startTime} - {section.endTime})
                                    </Select.Option>
                                ))}
                            </Select>
                            <Button
                                type="primary"
                                block
                                style={{ marginTop: 10 }}
                                onClick={() => handleEnroll(course._id)}
                            >
                                Enroll
                            </Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default OfferedCourse;
