# pylint: disable=invalid-name
# pylint: disable=missing-docstring
from flask import Blueprint, jsonify, current_app
import requests
import time

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

    while r.status_code == 202:
        time.sleep(.5)
        r = requests.get(commit_request, headers=headers)

    commitCounts = {}
    for contrib in r.json():
        author = contrib['author']['login']
        commits = contrib['total']
        commitCounts[author] = commits

    issues_request = url + \
        'search/issues?q=repo:drewromanyk/glamrous.me+is:issue+is:closed&per_page=100'
    total_issue_count = 0
    issueCounts = {}
    r = requests.get(issues_request, headers=headers)
    json_data = r.json()
    for issue in json_data['items']:
        total_issue_count += 1
        if issue['state'] == 'closed':
            if issue['assignees']:
                for issue_assignee in issue['assignees']:
                    assignee = issue_assignee['login']
                    if assignee not in issueCounts:
                        issueCounts[assignee] = 0
                    issueCounts[assignee] += 1
            else:
                print('WARNING: Issue #' +
                      str(issue['number']) + ' has no assignee')

    response = {'contributors': []}
    for user in commitCounts:
        response['contributors'].append({
            'author': user,
            'commits': commitCounts[user],
            'issues': issueCounts[user] if user in issueCounts else 0
        })

    total_commit_count = sum(commitCounts.values())
    response['totals'] = {'commits': total_commit_count,
                          'issues': total_issue_count}

    return jsonify(response)
