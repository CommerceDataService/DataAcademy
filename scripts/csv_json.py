import csv, ujson as json, pprint

pp = pprint.PrettyPrinter(indent=2)

def mapjson(course, uid, course_key = ['original_date','course_name','prereq_1_name','prereq_1_link','prereq_2_name','prereq_2_link','instructor','course_length','description','topics_covered', 'additional_resources', 'register', 'software_needed', 'class_type','website_identifier','slidedeck','video_download','additional_materials','related_class_1_name','related_class_1_link','related_class_2_name','related_class_2_link','related_class_3_name','related_class_3_link','level','youtube_link']):
    course_entry = { key: value for (key, value) in zip(course_key, course) }
    course_entry['uid'] = uid
    return course_entry

course_json = []
with open('./Commerce Data Academy Courses - MarksVersion.csv', 'rt') as f:
    courses = csv.reader(f)
    for i, course in enumerate(courses):
        # if i == 0:
        #     course_key = course
        if i != 0:
            course_json.append(mapjson(course, i))

with open('cda_courses.json', 'wt') as f:
    json.dump({ 'data':course_json }, f)

