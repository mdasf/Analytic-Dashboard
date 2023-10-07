from flask import request
from flask import jsonify
from models.InsightModel import InsightsModel
from models.InsightModel import db
from urllib.parse import unquote_plus
from sqlalchemy import func, extract
import os,json, datetime

def get_all_insights():
    insights = InsightsModel.query.all()
    insights_list = [{'id': insight.id, 'title': insight.title} for insight in insights]
    return jsonify(insights_list)
def get_all_region_data():
    result = db.session.query(InsightsModel.region).distinct().all()
    regions = [value[0] for value in result]
    return jsonify(regions)

def get_all_sectors_data():
    sector = request.args.get('sector');
    if sector:
        result = db.session.query(
            func.extract('YEAR', InsightsModel.published).label('published_year'),
            func.avg(InsightsModel.intensity).label('average_intensity'),
            func.avg(InsightsModel.relevance).label('average_relevance'),
            func.avg(InsightsModel.likelihood).label('average_likelihood')
        ).filter(InsightsModel.sector == sector).group_by(func.extract('YEAR', InsightsModel.published)).order_by(
            func.extract('YEAR', InsightsModel.published))
        results = result.all()
        sector_data = [{'published_year': r.published_year, 'average_intensity': r.average_intensity,
                        'average_relevance': r.average_relevance, 'average_likelihood': r.average_likelihood} for
                       r in results]
        return jsonify(sector_data)
    else:
        result = db.session.query(InsightsModel.sector).distinct().all()
        sectors = [value[0] for value in result]
        return jsonify(sectors)

def get_all_topics_data():
    sector=unquote_plus(request.args.get('sector'))
    print(sector)
    result = db.session.query(InsightsModel.topic).filter_by(sector=sector).distinct().all()
    topics = [value[0] for value in result]
    return jsonify(topics)

def get_insights_data():
    source = request.args.get('source')
    query_obj = InsightsModel.query
    if source:
        query_obj = query_obj.filter_by(source=source)
    insights = query_obj.all()
    insights_list = [{'id': r.id, 'title': r.title, 'relevance': r.relevance, 'intensity': r.intensity,
             'start_year': r.start_year, 'end_year': r.end_year, 'sector': r.sector, 'topic': r.topic,
             'insight': r.insight, 'url': r.url, 'added': r.added, 'published': r.published, 'source': r.source,
             'likelihood': r.likelihood, 'country': r.country, 'region': r.region} for r in insights]
    return jsonify(insights_list)

def sector_wise_insights():
    region = request.args.get('region')
    year = request.args.get('year')
    query_obj = db.session.query(InsightsModel.sector,db.func.count().label('total_insights_per_sector'))
    if region:
        query_obj = query_obj.filter_by(region=region)
    if year:
        query_obj= query_obj.filter(extract('year', InsightsModel.published) == year)

    result = query_obj.group_by(InsightsModel.sector).all()
    sector_total_insights = [{'sector': r.sector, 'total_insights_per_sector': r.total_insights_per_sector}
                             for r in result]
    return jsonify(sector_total_insights)
def get_source_relevance_data():
    sector = request.args.get('sector')
    topic = request.args.get('topic')
    if sector:
        if topic:
            result = db.session.query(
                InsightsModel.source,
                db.func.avg(InsightsModel.relevance).label('average_relevance')
            ).filter(InsightsModel.sector==sector,InsightsModel.topic==topic).group_by(InsightsModel.source).all()
            queryList = [{'source': r.source, 'relevance': r.average_relevance} for r in result]
            return jsonify(queryList)
def get_total_insights_per_source():
    result = db.session.query(
        InsightsModel.source,
        db.func.count().label('total_insights_per_source')).group_by(InsightsModel.source).order_by(
        db.desc('total_insights_per_source')).all()
    queryList = [{'source': r.source, 'total_insights_per_source': r.total_insights_per_source} for r in result]
    return jsonify(queryList)




def fill_table():
    script_dir = os.path.dirname(__file__)
    print(script_dir)
    absolute_path = os.path.abspath(os.path.join(script_dir, '../data.json'))
    try:
        with open(absolute_path, 'r') as json_file:
            dataList = json.load(json_file)
            for item in dataList:
                print(item)
                insertRow(item)
            return ''
    except FileNotFoundError:
        return 'JSON file not found.'

def insertRow(insight):
    new_row = InsightsModel(
        end_year = None if insight['end_year'] == '' else insight['end_year'],
        intensity=None if insight['intensity'] == '' else insight['intensity'],
        sector=insight['sector'],
        topic=insight['topic'],
        insight=insight['insight'],
        url=insight['url'],
        region=insight['region'],
        start_year = None if insight['start_year'] == '' else insight['start_year'],
        impact=insight['impact'],
        added=None if insight['added'] == '' else datetime.strptime(insight['added'], '%B, %d %Y %H:%M:%S'),
        published=None if insight['published'] == '' else datetime.strptime(insight['published'], '%B, %d %Y %H:%M:%S'),
        country=insight['country'],
        relevance=None if insight['relevance'] == '' else insight['relevance'],
        pestle=insight['pestle'],
        source=insight['source'],
        title=insight['title'],
        likelihood=None if insight['likelihood'] == '' else insight['likelihood'],
    )

    db.session.add(new_row)
    db.session.commit()
