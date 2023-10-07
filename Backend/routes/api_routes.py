from flask import Blueprint
from services.insight_service import *
api_blueprint = Blueprint('api', __name__)

@api_blueprint.route('/insights')
def get_insights():
    return get_insights_data()

@api_blueprint.route('/sector-wise-insights')
def get_sector_wise_insights():
    return sector_wise_insights()

@api_blueprint.route('/insights-per-source')
def total_insight_per_source():
    return get_total_insights_per_source()

@api_blueprint.route('/source-relevance')
def get_source_relevance():
   return get_source_relevance_data()

@api_blueprint.route('/regions')
def get_all_region():
    return get_all_region_data()

@api_blueprint.route('/sectors')
def get_all_sectors():
    return get_all_sectors_data()

@api_blueprint.route('/topics')
def get_all_topics():
    return get_all_topics_data()


@api_blueprint.route('/fill-data',methods=['POST'])
def fill_json_data():
    fill_table()
    return 'data insertion successfull'
