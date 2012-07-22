class window.SocialStream extends Backbone.View

        el: '#social-stream'
        template: _.template($('#social-stream-template').html()),

        initialize: ->
                _.bindAll @
                #initializing models collections
                @posts = new Posts
                @posts.bind 'add', @injectPost          
                @wikipages = new WikiPages
                @wikipages.bind 'add', @injectWikipage          
                @questions = new Questions
                @questions.bind 'add', @injectQuestion
                @links = new Links
                @links.bind 'add', @injectLink
                                
                #bindings publisher events to the stream
                window.mediator.bind "new-post", (post)=>
                  @addPost post  
                window.mediator.bind "new-wikipage", (wikipage)=>
                  @addWikipage wikipage
                window.mediator.bind "new-question", (question)=>
                  @addQuestion question
                window.mediator.bind "new-link", (link)=>
                  @addLink link
                  

                @render()

                #initializing posts rendered from the server
                @posts.add eval(posts)
                                
                #wikipage = new WikiPage
                #wikipageView = new WikiPageView        model: wikipage
                #@injectView wikipageView
                
                post = @posts.last()
                
                #activity = new Activity
                        #post: post
                #activity.set
                        #verb: "commented"
                        #object: "a post"
                        #target: "on his wall"
                        
                #activityView = new ActivityView        model: activity
                #@injectView activityView
                

        render: ->
                $(@el).html @template posts: JSON.stringify(@posts)
                @
                
        #injecting views

        injectPost: (post)=>
                postView = new PostView model: post
                @injectView postView

        injectWikipage: (wikipage)=>
                wikipageView = new WikiPageView model: wikipage
                @injectView wikipageView                

        injectQuestion: (question)=>
                questionView = new QuestionView model: question
                @injectView questionView

        injectLink: (link)=>
                linkView = new LinkView model: link
                @injectView linkView
                
        injectView: (view)=>
                $("#social-stream-table").prepend(view.render().el)
                
        #adding new models to the collections
        
        addPost: (post)=>
                post.save(null,
                        success: (post)=> @posts.add post
                )
                
        addWikipage: (wikipage)=>
                wikipage.save(null,
                        success: (wikipage)=> @wikipages.add wikipage
                )               

        addQuestion: (question)=>
                @questions.add question

        addLink: (link)=>
                @links.add link         
                

