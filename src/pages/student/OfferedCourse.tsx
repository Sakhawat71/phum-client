import { Button, Col, Row } from 'antd';
import {
    useEnrollCourseMutation,
    useGetAllOfferedCoursesQuery
} from '../../redux/features/student/studentCourse.api';
import { toast } from 'sonner';


type TCourse = {
    [index: string]: any;
};

const OfferedCourse = () => {
    const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);
    const [enroll] = useEnrollCourseMutation();

    const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
        const key = item.course.title;
        acc[key] = acc[key] || { courseTitle: key, sections: [] };
        acc[key].sections.push({
            section: item.section,
            _id: item._id,
            days: item.days,
            startTime: item.startTime,
            endTime: item.endTime,
        });
        return acc;
    }, {});

    const modifiedData = Object.values(singleObject ? singleObject : {});

    const handleEnroll = async (id : string) => {
        const enrollData = {
            offeredCourse: id,
        };
        // console.log(enrollData);

        const toastId = toast.loading('Enrolling .... ')
        try {
            await enroll(enrollData);
            // console.log(res);
            toast.success('course enrolled successfully',{id : toastId})
        } catch (error) {
            toast.error(`can't enroll course`, {id : toastId})
        }
    };

    if (!modifiedData.length) {
        return <p>No available courses</p>;
    }

    return (
        <Row gutter={[0, 20]}>
            {modifiedData.map((item) => {
                return (
                    <Col span={24} style={{ border: 'solid #d4d4d4 2px' }}>
                        <div style={{ padding: '10px' }}>
                            <h2>{item.courseTitle}</h2>
                        </div>
                        <div>
                            {item.sections.map((section) => {
                                return (
                                    <Row
                                        justify="space-between"
                                        align="middle"
                                        style={{ borderTop: 'solid #d4d4d4 2px', padding: '10px' }}
                                    >
                                        <Col span={5}>Section: {section.section} </Col>
                                        <Col span={5}>
                                            days:{' '}
                                            {section.days.map((day) => (
                                                <span> {day} </span>
                                            ))}
                                        </Col>
                                        <Col span={5}>Start Time: {section.startTime} </Col>
                                        <Col span={5}>End Time: {section.endTime} </Col>
                                        <Button onClick={() => handleEnroll(section._id)}>
                                            Enroll
                                        </Button>
                                    </Row>
                                );
                            })}
                        </div>
                    </Col>
                );
            })}
        </Row>
    );
};

export default OfferedCourse;