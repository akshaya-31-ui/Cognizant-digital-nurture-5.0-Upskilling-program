show databases;

<--Exercise:1-->

select e.event_id,e.title,avg(f.rating) as avg_rating
from eventss e 
join feedback f on e.event_id=f.event_id
group by e.event_id,e.title
having count(f.feedback_id)>=10
order by  avg_rating desc;

<--Exercise:2-->

select * from users 
where user_id not in(
select user_id from registrations
where registration_date>=date_sub(curdate()-interval 90 day));

<--Exercise:3-->

select e.event_id,count(s.session_id) as session_count
from eventss e
join sessions s on e.event_id=s.event_id
where time(s.start_time)>='10:00:00'
and time(s.start_time)<'12:00:00'
group by e.event_id;

<--Exercise:4-->

select u.city,count(r.user_id) as total_registrations
from users u
join registrations r on u.user_id=r.user_id
group by u.city order by total_registrations desc
limit 5;

<--Exercise:5-->

select e.title,count(r.resource_id) as total_no_of_resources,
sum(case when r.resource_type='pdf' then 1 else 0 end) as pdf,
sum(case when r.resource_type='image' then 1 else 0 end) as image,
sum(case when r.resource_type='links' then 1 else 0 end) as links
from eventss e
join resources r on e.event_id=r.event_id
group by e.event_id;

<--Exercise:6-->

select u.full_name,f.rating,f.comments,e.title
from feedback f
join users u on f.user_id=u.user_id
join eventss e on f.event_id=e.event_id
where f.rating<3;

<--Exercise:7-->

select e.title as event_name,e.statuss,count(s.session_id) as total_sessions
from eventss e
join sessions s on e.event_id=s.event_id
where e.statuss='upcoming'
group by e.event_id;

<--Exercise:8-->

select u.full_name as organizer,count(e.event_id) as event_id,
sum(case when e.statuss='upcoming' then 1 else 0 end) as upcoming,
sum(case when e.statuss='completed' then 1 else 0 end) as completed,
sum(case when e.statuss='cancelled' then 1 else 0 end) as cancelled
from users u
join eventss e on u.user_id=e.organizer_id
group by u.user_id;

<--Exercise:9-->

select e.event_id,e.title,count(r.register_id) as registered
from eventss e
join registrations r on e.event_id=r.event_id
where e.event_id not in(
select distinct event_id from feedback)
group by e.event_id;

<--Exercise:10-->

select registration_date,count(user_id) as no_of_day_registers
from users
where registration_date>=date_sub(curdate(),interval 7 day)
group by registration_date;

<--Exercise:11-->

select e.title,count(s.session_id) as total_sessions
from eventss e
join sessions s on e.event_id=s.event_id
group by e.event_id,e.title
having count(s.session_id)=(
select max(session_count)
from (
select count(session_id) as session_count
from sessions
group by event_id) as counts);

<--Exercise:12-->

select e.city,avg(f.rating) as avg_rating,count(f.feedback_id) as total_feedback
from eventss e
join feedback f on e.event_id=f.event_id
group by e.city;

<--Exercise:13-->

select e.title,count(r.event_id) as no_of_registrations
from eventss e
join registrations r on e.event_id=r.event_id
group by e.event_id 
order by no_of_registrations desc
limit 3;

<--Exercise:14-->

select s1.event_id,e.title as event_title,
s1.title as session1,s1.start_time as s1_start,s1.end_time as s1_end,
s2.title as session2,s2.start_time as s2_start,s2.end_time as s2_end
from sessions s1
join sessions s2
on s1.event_id=s2.event_id and s1.session_id<s2.session_id
join eventss e on s1.event_id=e.event_id
where s1.start_time<s2.end_time and s1.end_time>s2.start_time;

<--Exercise:15-->

select user_id,full_name,REGISTRATION_DATE
from users 
where user_id not in (
select distinct user_id from registrations)
and REGISTRATION_DATE>=date_sub(curdate(),interval 30 day);

<--Exercise:16-->

select spearker_name,count(session_id) as total_sessions,
group_concat(title separator '|') as title
from sessions
group by spearker_name
having count(session_id)>1;

<--Exercise:17-->

select e.event_id,e.title as event_name
from eventss e
where e.event_id not in(
select distinct event_id from resources);

<--Exercise:18-->

select e.title,e.statuss,count(r.register_id) as total_registrations,count(distinct f.feedback_id) as no_of_feedbacks,avg(f.rating) as avg_rating
from eventss e
join registrations r on e.event_id=r.event_id
join feedback f on e.event_id=f.event_id
where e.statuss='completed'
group by e.event_id,e.title;

<--Exercise:19-->

select u.full_name,count(r.register_id) as no_of_events_attented,count(f.feedback_id) as no_of_feedbacks
from users u
join registrations r on u.user_id=r.user_id
join feedback f on u.user_id=f.user_id
group by u.user_id;

<--Exercise:20-->

select u.full_name,count(f.feedback_id) as no_of_feedbacks
from users u
join feedback f on u.user_id=f.user_id
group by u.user_id,u.full_name
order by no_of_feedbacks desc
limit 5;

<--Exercise:21-->

select u.full_name,e.title,count(r.register_id) as no_of_registers
from users u
join eventss e on u.user_id=e.organizer_id
join registrations r on u.user_id=r.user_id
group by r.event_id,r.user_id,u.full_name,e.title
having count(r.register_id)>1; 

<--Exercise:22-->

SELECT u.full_name, e.title AS event_name,
COUNT(r.register_id) AS registration_count
FROM Registrations r
JOIN users u ON r.user_id = u.user_id
JOIN eventss e ON r.event_id = e.event_id
GROUP BY r.user_id, r.event_id, u.full_name, e.title
HAVING COUNT(r.register_id) > 1;

<--Exercise:23-->

SELECT YEAR(registration_date) AS years,MONTH(registration_date) AS months,
MONTHNAME(registration_date) AS month_name,
COUNT(register_id) AS total_registrations
FROM registrations
WHERE registration_date >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY YEAR(registration_date), MONTH(registration_date), MONTHNAME(registration_date)
ORDER BY years ASC, months ASC;

<--Exercise:24-->

SELECT e.title,ROUND(AVG(TIMESTAMPDIFF(MINUTE, s.start_time, s.end_time)), 2) AS avg_duration_minutes
FROM eventss e
JOIN Sessions s ON e.event_id = s.event_id
GROUP BY e.event_id, e.title
ORDER BY avg_duration_minutes DESC;

<--Exercise:25-->

SELECT e.title, e.city, e.statuss, e.start_date
FROM eventss e
WHERE e.event_id NOT IN (
SELECT DISTINCT event_id FROM Sessions);