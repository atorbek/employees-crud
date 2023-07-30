package ru.naumen.modules.objectsLinksVisualizer

import groovy.transform.Canonical
import groovy.transform.Field
import ru.naumen.core.server.script.api.DbApi
import ru.naumen.core.server.script.api.injection.InjectApi
import ru.naumen.core.shared.dto.ISDtObject

import static ru.naumen.modules.objectsLinksVisualizer.Constants.*
import static com.amazonaws.util.json.Jackson.toJsonString as toJson

@Field @Lazy @Delegate ObjectsLinksController controller = ObjectsLinksControllerImpl.instance

interface ObjectsLinksController
{
    /**
     * Возвращает список связанных объектов
     * @param subjectUUID идентификатор целевого объекта
     * @return список связанных объектов в формате json
     */
    String getLinkedObjects(String subjectUUID)

    /**
     * Возвращает список конфигурации типов с учетом проверки прав на действие со связанными объектами
     * @param subjectUUID идентификатор целевого объекта
     * @param action действие
     * @return список конфигурации типов в формате json
     */
    String getTypes(String subjectUUID, String action)
}

class Constants
{
    final static String RULE_METACLASS = 'configRules'
    final static String METACLASS_ATTR_CODE = 'metaclassCode'

    final static String RULE_BUTTON_TITLE_ATTR_CODE = 'buttonTitle'
    final static String RULE_OBJECT_TITLE_ATTR_CODE = 'objectTitle'
    final static String RULE_SHORT_TITLE_ATTR_CODE = 'shortTitle'
    final static String RULE_OBJECT_ICON_ATTR_CODE = 'iconTitle' //objectIcon
    final static String RULE_STATE_ATTR_CODE = 'state'
    final static String RULE_TEXT_CODE_ATTR_CODE = 'descrCode' //textCode
    final static String RULE_DATE_CODE_ATTR_CODE = 'deadlineCode' //dateCode
    final static String RULE_RESP_CODE_ATTR_CODE = 'responsCode' //respCode
    final static String RULE_META_CLASS_CODE_ATTR_CODE = 'metaclassCode' //metaClassCode
    final static String RULE_RELATION_CODE_ATTR_CODE = 'relatedObject' //relationCode
    final static String RULE_FAST_ADD_FORM_CODE_ATTR_CODE = 'formFastAdd' //fastAddForm
}

@Canonical
/**
 * Модель связанного объекта
 */
class LinkedObject
{
    /**
     * Статус
     */
    State state

    /**
     * Тип объекта
     */
    String type

    /**
     * Описание объекта
     */
    String description

    /**
     * Дедлайн
     */
    String deadline

    /**
     * Идентификатор
     */
    String UUID

    /**
     * Идентификатор правила
     */
    String ruleUUID
}

@Canonical
/**
 * Модель конфигурационного правила
 */
class ConfigRule
{
    /**
     * Название кнопки
     */
    String buttonTitle

    /**
     * Название объекта
     */
    String objectTitle

    /**
     * Сокращенное название объекта
     */
    String shortTitle

    /**
     * Иконка объекта
     */
    Object objectIcon

    /**
     * Статус объекта
     */
    String state

    /**
     * Код атрибута описание
     */
    String textCode

    /**
     * Код атрибута даты
     */
    String deadLineCode

    /**
     * Код атрибута ответственного
     */
    String respCode

    /**
     * Код Метакласса
     */
    String metaClassCode

    /**
     * Код атрибута связанного объекта
     */
    String relationCode

    /**
     * Код формы быстрого добавления
     */
    String fastAddForm

    /**
     * Идентификатор
     */
    String UUID
}

@Canonical
/**
 * Модель конфигурации типа
 */
class TypeConfig
{
    /**
     * Название объекта
     */
    String objectTitle

    /**
     * Сокращенное название объекта
     */
    String shortTitle

    /**
     * Код формы быстрого добавления
     */
    String fastAddForm

    /**
     * Идентификатор правила
     */
    String UUID

    /**
     * Код метакласса
     */
    String metaСlass
}

@Canonical
/**
 * Модель состояния связанного объекта
 */
class State
{
    /**
     * Цвет состояния объекта
     */
    String color

    /**
     * Название состояния объекта
     */
    String title
}

@Canonical
/**
 * Модель типа связанного объекта
 */
class Type
{
    /**
     * Полное название типа объекта
     */
    String title

    /**
     * Сокращенное название типа объекта
     */
    String shortTitle

    /**
     * Иконка типа объекта
     */
    String icon
}

@Canonical
class LinkedObjectsData
{
    NormalizedData<LinkedObject> objects

    NormalizedData<ConfigRule> rules
}

/**
 * Нормализованные данные
 */
class NormalizedData<T>
{
    Map<String, T> byUUID
    Set<String> allUUIDs

    NormalizedData(List<T> objects)
    {
        this.byUUID = objects?.collectEntries {[it.UUID, it]}
        this.allUUIDs = objects?.UUID
    }
}

/**
 * Формат ответа метода получения связанных объектов
 */
@Canonical
class LinkedObjectsResponse
{
    LinkedObjectsData data

    String error
}

/**
 * Формат ответа метода получения типов объектов
 */
@Canonical
class TypesResponse
{
    NormalizedData<TypeConfig> data

    String error
}

@Singleton
@InjectApi
class ObjectsLinksControllerImpl implements ObjectsLinksController
{
    ObjectsLinksService service = ObjectsLinksService.instance
    ObjectsLinksMapper mapper = ObjectsLinksMapper.instance

    @Override
    String getLinkedObjects(String subjectUUID)
    {
        List<LinkedObject> objects
        List<ConfigRule> rules
        String error

        try
        {
            ISDtObject subject = utils.get(subjectUUID)

            rules = service.findRules(subject)
            objects = service.getLinkedObjects(rules, subject)
        }
        catch (Exception e)
        {
            error = e.getMessage()
            logger.error(e.getMessage(), e)
        }

        return toJson(
            new LinkedObjectsResponse(
                data: new LinkedObjectsData(
                    objects: new NormalizedData(objects),
                    rules: new NormalizedData(rules)
                ),
                error: error
            )
        )
    }

    @Override
    String getTypes(String subjectUUID, String action)
    {
        List<TypeConfig> typeConfigs
        String error

        try
        {
            ISDtObject subject = utils.get(subjectUUID)
            List<ConfigRule> rules = service.findRules(subject, action)

            typeConfigs = rules.collect { ConfigRule rule -> mapper.toTypeConfig(rule)
            }
        }
        catch (Exception e)
        {
            error = e.getMessage()
            logger.error(e.getMessage(), e)
        }


        return toJson(new TypesResponse(data: new NormalizedData(typeConfigs), error: error))
    }
}

@Singleton
@InjectApi
class ObjectsLinksService
{
    ObjectsLinksMapper linksMapper = ObjectsLinksMapper.instance

    /**
     * Возвращает список связанных объектов {@link LinkedObject}
     * @param rules список правил {@link ConfigRule}
     * @param subject целевой объект {@link ISDtObject}
     * @return список связанных объектов
     */
    List<LinkedObject> getLinkedObjects(List<ConfigRule> rules, ISDtObject subject)
    {
        List<LinkedObject> linkedObjects = []

        rules.each { ConfigRule configRule ->
            List<ISDtObject> objects = [] + subject[configRule.relationCode]

            linkedObjects.addAll(
                objects.collect {
                    linksMapper.toLinkedObject(it, configRule)
                }
            )
        }

        return linkedObjects
    }

    /**
     * Находит и возвращает список подходящих целевому объекту правил, с учетом проверки правв
     * пользвателя, если указано соответствующее действие
     * @param subject целевой объект {@link ISDtObject}
     * @param action действие, для которого выполняется проверка прав пользователя
     * @return список подходящих правил {@link ConfigRule}
     */
    List<ConfigRule> findRules(ISDtObject subject, String action = null)
    {
        String subjectClass = subject.metaClass.getId()

        String queryStr = "FROM ${ RULE_METACLASS } " +
                          "WHERE ${ METACLASS_ATTR_CODE } = '${ subjectClass }' " +
                          "AND state = 'active' " +
                          "AND removed = 'false'"

        DbApi.Query query = api.db.query(queryStr)
        query.setCachable(true)

        List<ISDtObject> rules = query.list()

        List<ConfigRule> configRules = rules.collect { linksMapper.toConfigRule(it) }

        switch (action)
        {
            case 'add':
                configRules = configRules.findAll { ConfigRule rule ->
                    checkRightToAddObject(
                        linksMapper.getLinkedObjectMetaClass(rule.metaClassCode, rule.relationCode)
                    )
                }
                break
            case 'edit':
                configRules = configRules.findAll { ConfigRule rule ->
                    checkRightToEditObject(rule.metaClassCode, rule.relationCode)
                }
                break
        }

        return configRules
    }

    /**
     * Выполняет проверку права пользователя на добавление объекта переданного класса/типа
     * @param fqn класс/тип объектов, для которых будет выполняться проверка
     * @return результат проверки
     */
    Boolean checkRightToAddObject(String fqn)
    {
        ISDtObject object = findFirstOrCreateObject(fqn)

        return api.security.hasPermission(object, 'AddObject')
    }

    /**
     * Выполняет проверку права пользователя на редактирование атрибута объекта переданного класса/типа
     * @param fqn класс/тип объектов, для которых будет выполняться проверка
     * @param attributeCode код атрибута, на редактирование которого будет выполняться проверка
     * @return результат проверки
     */
    Boolean checkRightToEditObject(String fqn, String attributeCode)
    {
        ISDtObject object = findFirstOrCreateObject(fqn)

        return api.security.hasEditAttrPermission(object, attributeCode)
    }

    /**
     * Находит или создает объект (если не найден) переданного класса/типа
     * @param fqn класс/тип объекта
     * @return объект smp {@link ISDtObject}
     */
    ISDtObject findFirstOrCreateObject(String fqn)
    {
        ISDtObject object = utils.findFirst(fqn, [:])

        if (!object)
        {
            Map<String, Object> params = [title : 'Для проверки прав']

            api.tx.call {
                object = utils.create(fqn, params)
            }
        }

        return object
    }
}

@Singleton
@InjectApi
class ObjectsLinksMapper
{
    ObjectsLinksService service = ObjectsLinksService.instance

    /**
     * Выполняет преобразование объекта smp {@link ISDtObject} в объект правила {@link ConfigRule}
     * @param object объект smp
     * @return объект правила
     */
    ConfigRule toConfigRule(ISDtObject object)
    {

        return new ConfigRule(buttonTitle : object[RULE_BUTTON_TITLE_ATTR_CODE],
                              objectTitle : object[RULE_OBJECT_TITLE_ATTR_CODE],
                              shortTitle : object[RULE_SHORT_TITLE_ATTR_CODE],
                              objectIcon : object[RULE_OBJECT_ICON_ATTR_CODE],
                              state : RULE_STATE_ATTR_CODE,
                              textCode : object[RULE_TEXT_CODE_ATTR_CODE],
                              deadLineCode : object[RULE_DATE_CODE_ATTR_CODE],
                              respCode : object[RULE_RESP_CODE_ATTR_CODE],
                              metaClassCode : object[RULE_META_CLASS_CODE_ATTR_CODE],
                              relationCode : object[RULE_RELATION_CODE_ATTR_CODE],
                              fastAddForm : object[RULE_FAST_ADD_FORM_CODE_ATTR_CODE],
                              UUID: object.UUID)
    }

    LinkedObject toLinkedObject(ISDtObject object, ConfigRule rule)
    {
        State state = new State(
            color: api.wf.state(object).color.value,
            title: object[rule.state]
        )

        Type type = new Type(
            title: rule.objectTitle,
            shortTitle: rule.shortTitle,
            icon: rule.objectIcon?.UUID
        )

        return new LinkedObject(state : state,
                                type : object.metaClass,
                                description : object[rule.textCode],
                                deadline : getDeadLineTime(object, rule.deadLineCode),
                                UUID: object.UUID,
                                ruleUUID: rule.UUID)
    }

    /**
     * Вычисляет время дедлайна по переданному коду атрибута
     * @param object объект для которого получаем значение дедлайна
     * @param attrCode код атрибута
     * @return время дедлайна
     */
    Long getDeadLineTime(ISDtObject object, String attrCode)
    {
        String attrType = api.metainfo.getMetaClass(object.metaClass).attributes.find {
            it.code == attrCode
        }.attribute.type.code

        Long deadLineTime

        switch (attrType)
        {
            case 'backTimerDto':
            case 'backTimer':
                deadLineTime = object.get(attrCode)?.deadLineTime?.time
                break
            default:
                deadLineTime = object.get(attrCode)?.time
        }

        return deadLineTime
    }

    /**
     * Выполняет преобразование объекта правила {@link ConfigRule} в конфигурацию типа объекта {@link TypeConfig}
     * @param rule объект правила
     * @return конфигураитя типа объекта
     */
    TypeConfig toTypeConfig(ConfigRule rule)
    {
        String metaClass = getLinkedObjectMetaClass(rule.metaClassCode, rule.relationCode)

        return new TypeConfig(
            objectTitle: rule.objectTitle,
            shortTitle: rule.shortTitle,
            fastAddForm: rule.fastAddForm,
            UUID: rule.UUID,
            metaСlass: metaClass
        )
    }

    /**
     * Возвращает fqn связанного объекта заданного класса/типа по переданому коду атрибута
     * @param fqn класс/тип объекта
     * @param attrCode код аттрибута
     * @return fqn связанного объекта
     */
    String getLinkedObjectMetaClass(String fqn, String attrCode)
    {
        String linkedMetaClass =
            api.metainfo.getMetaClass(fqn).getAttribute(attrCode).attribute.permittedTypesCache[0]

        return linkedMetaClass
    }
}
