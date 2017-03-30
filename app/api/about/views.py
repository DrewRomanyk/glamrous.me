# pylint: disable=invalid-name
# pylint: disable=missing-docstring
from flask import Blueprint, jsonify, current_app
import requests

api_about_blueprints = Blueprint(
    'api_about', __name__
)

@api_about_blueprints.route('/api/about/contributions')
def get_contributions():
    url = 'https://api.github.com/'
    repo = 'repos/DrewRomanyk/glamrous.me/'

    token = current_app.config.get('GITHUB_AUTH_TOKEN')
    headers = {'Authorization': 'token ' + token}

    commit_request = url + repo + 'stats/contributors'
    r = requests.get(commit_request, headers=headers)
    commitCounts = {}
    issueCounts = {}
    for contrib in r.json():
        author = contrib['author']['login']
        commits = contrib['total']
        commitCounts[author] = commits
        issueCounts[author] = 0

    issues_request = url + repo + 'issues?state=closed'
    r = requests.get(issues_request, headers=headers)
    for issue in r.json():
        if issue['assignee']:
            assignee = issue['assignee']['login']
            issueCounts[assignee] += 1
        else:
            print('WARNING: Issue #' + str(issue['number']) + ' has no assignee')

    response = []
    for user in commitCounts:
        response.append({
            'author': user,
            'commits': commitCounts[user],
            'issues': issueCounts[user]
            })

    print(response)
    return jsonify(response)
