export default {
  path: '/module/myReport',
  label: '我的报告',
  component: resolve => require(['../pages/module2/myReport'], resolve),
  name: 'myReport',
  icon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEOEJDNTEyNTQ3OUExMUU4QjUwMzlBM0IxQUUyQkI2QSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEOEJDNTEyNjQ3OUExMUU4QjUwMzlBM0IxQUUyQkI2QSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkQ4QkM1MTIzNDc5QTExRThCNTAzOUEzQjFBRTJCQjZBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkQ4QkM1MTI0NDc5QTExRThCNTAzOUEzQjFBRTJCQjZBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+w5/RmAAAA5BJREFUeNrEV89LG0EUfpuqYC9VEASprYJoRUVyEI0gbASJR/+G3nrrTQ+l9JjeCsVbe/ZSsFCKgkVCU/yBLRKiSELAlGiomKKnirKz0/lmdsLsbpJCaeyEYefHznzve997MxtrcXHxHhG9F9W2LIs459SkkhL7PxXPTAsA4/G4nUgkqJllfX3dTqVSr0QzDlAfIGNMVrDWxWTvum61jXd0H21zHda0trZSW1ub7M/Pz5MAtUXzYYtpzdXVFd3c3MgF2ABPbIqnrnpcz2lDMK7BzDUdHR3U09Njwnz3gba3t8va7OIDvbi48FkZbNeaCz5Nj2gvjI+P1wft7Oyk2yg+0EqlErLe1C3IJDgW1FzXaDTqBzWjtKur63aYmulwdnZWVzOTeZDh8lqFIsL4fK5AL59EQ+9PTEzUd293d/dfWc4/fiZmcYLPgkHzR03L5XKImdazXpTKHHUZaZH29/dD3picnKwPGkjiavn2PE5WhOj6p0Ox1+nQPPvwSYAqWARNMvGCuMvp5McJLWffNmZaKpVqRiNxnDQ464iOjo7o7uU7edz9Oj+n6wePiTmKKV7Z29sj14tgxOjW1hZNT0/XB+3t7ZXPN/cf0Z1IhE5LZXrGL+mrCzwVcMPDw1T8IkDEPJCgIVs9VRaJgqBZc1eVBWLMBNSZEjFTplgs0vHxsacVl7bncjkhqmDtqmsvm81K17nMrWpYvSREf2dnp9rH+nQ67bs4UCNmyvT19VF/f79xs1g0NDQkDUBgQLexsTHiOBiYI/vQkDF14GPF1NSUdC8T8ygzMzMhTSNmBywLhYKIRhF9XDGBhpyJ7UTFL5PJCIOYFBk/aCiZOQoEGjIvomGFuM4ag4LlwMCACiAvXaAh99xLXh5ybOqwqoZwtXY3NARLsIe/bdtuDJrP56WGps4HBwckiblcjkNDLjbkrgLd3d1VIF6uQkPFVDHf3NxsDDo4OCg15F7koYyOjiqmjivdBQ1dAcA9TyDxmePKyj0NHUcxxT6zs7ONQcESGhpEpYay68UbNAQg9zTb3t72mCpm0BBGoY99NjY2wqCmK8FSasipCqzOUsuXh/IFpJQYisVi6tjzNIWGCEKdFXNzcyFQS3yC8mQyKTuHh4c178ha92S9W8h8V6ee/vBbWlqSmL4TaWRk5Fbu0wj9hwJNUysrK00H8jBS+sthQUToe1Htf7F5g78mAFxA47cAAwAIeTpDmtW2FwAAAABJRU5ErkJggg=='
}